import { ArgumentMetadata, HttpException, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    if (!value) {
      throw new HttpException('The file is required!', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
