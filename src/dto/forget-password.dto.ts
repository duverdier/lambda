import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le token est requis' })
  token: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le password est requis' })
  password: string;
}
