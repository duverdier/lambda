import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { resetPasswords } from './reset-passwords.service';
import { registerEmail } from './register-email.service';
import { assignPerformanceIndicatorStructure } from './assign-performance-indicator-email.service';
import { RegisterDto } from 'src/dto/register.dto';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';
import { AssignPerformanceIndicatorInterface } from '../../../interfaces/assign-performance-indicator';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async registerEmail(registerDto: RegisterDto): Promise<void> {
    try {
      const { email } = registerDto;
      const SUBJECT = '';
      const HEADER = '';
      const BODY = '';
      this.mailerService.sendMail(registerEmail({ email, SUBJECT, BODY, HEADER }));
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e?.message, e?.status);
    }
  }

  async resetPasswords(resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const { url, fullName, email } = resetPasswordDto;
      const SUBJECT = 'Réinitialiser votre mot de passe';
      this.mailerService.sendMail(resetPasswords({ email, SUBJECT, BODY: url, HEADER: fullName }));
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e?.message, e?.status);
    }
  }

  async assignPerformanceIndicatorStructure(
    assignPerformanceIndicatorInterface: AssignPerformanceIndicatorInterface,
  ): Promise<void> {
    try {
      const { url, fullName, email } = assignPerformanceIndicatorInterface;
      const SUBJECT = 'Un indicateur de performance vous a été assigné';
      const BODY = 'Un indicateur de performance vous a été assigné veuillez vous connecter';
      this.mailerService.sendMail(assignPerformanceIndicatorStructure({ url, email, SUBJECT, BODY, HEADER: fullName }));
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e?.message, e?.status);
    }
  }
}
