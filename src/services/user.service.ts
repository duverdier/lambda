import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User, Structure, Role } from 'src/entity';
import * as generatePassword from 'generate-password';
import * as bcrypt from 'bcrypt';
import { StructureService } from './structure.service';
import { MailService } from 'src/utils/mails/services/mails.service';
import { JwtService } from '@nestjs/jwt';
import { environmentVariable } from '../config/environment-variable';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
    private readonly structureService: StructureService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(userDto: UserDto) {
    const { email, structureId, ...restUserDto } = userDto;

    const structure = await this.structureService.getStructureById(structureId);
    if (!structure) {
      throw new HttpException('STRUCTURE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const password = await this.generatePassword();
    const user = await this.userRepository.create<User>({ ...restUserDto, email, password, structureId });
    const token = this.jwtService.sign({
      id: user.id,
    });
    const url = `${environmentVariable.UI_URL}/reset-password?token=${token}`;
    await this.mailService.resetPasswords({ email: user.email, url, fullName: user.name });
    return user;
  }

  getUsers() {
    return this.userRepository.findAll<User>();
  }

  findById(id: number) {
    return this.userRepository.findOne<User>({
      where: { id },
      include: { model: Structure, required: false, include: [{ model: Role, required: false }] },
      raw: true,
      nest: true,
    });
  }

  private async generatePassword() {
    const generatePwd = generatePassword.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });

    const password = await bcrypt.hash(generatePwd, 10);
    return password;
  }
}
