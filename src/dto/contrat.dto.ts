import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ContratDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le label est requis' })
  label: string;
}
