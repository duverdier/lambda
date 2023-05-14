import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { User, Structure } from 'src/entity';
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from 'src/dto/forget-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken(login: LoginDto) {
    const { username, password } = login;
    const account = await this.getUser(username);

    if (!account) {
      throw new HttpException('USER_OR_PASSWORD_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!(await this.isValidPassword(password, account.password))) {
      throw new HttpException('USER_OR_PASSWORD_NOT_FOUND', HttpStatus.FORBIDDEN);
    }
    const { password: _password, ...restAccount } = account;

    return {
      accessToken: this.jwtService.sign({
        id: account.id,
      }),
      ...restAccount,
    };
  }

  async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { model: Structure, required: false },
      raw: true,
      nest: true,
    });
    return user;
  }

  private isValidPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  async resetPassword(passwordToReset: ForgetPasswordDto) {
    try {
      const { password, token } = passwordToReset;
      const decodedToken = this.jwtService.decode(token) as { id: number };

      if (!(decodedToken && decodedToken.id)) {
        throw new HttpException("Jeton d'accès invalide.", HttpStatus.BAD_REQUEST);
      }
      const user = await this.getOne(decodedToken.id);
      if (!user) {
        throw new HttpException('Cette adresse est introuvable.', HttpStatus.FORBIDDEN);
      }
      await this.updatePassword(user.id, await this.encrypePassword(password));
      return { message: 'Votre mot de passe a été modifié' };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async updatePassword(id: number, password: string) {
    const user = await this.getOne(id);
    if (!user) {
      throw new HttpException('Cet utilisateur est introuvable.', HttpStatus.FORBIDDEN);
    }
    return await this.userRepository.update({ password }, { where: { id } });
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      raw: true,
      nest: true,
    });
    return user;
  }

  private async encrypePassword(generatePwd: string) {
    return await bcrypt.hash(generatePwd, 10);
  }
}
