import { Controller, Post, UseInterceptors, UploadedFile, Get, Res } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { excelFileFilter } from '../utils/upload-file/fileVerified/file-excel-filter';
import { editFileName } from '../utils/upload-file/fileVerified/edit-file-name';
import { UploadExcelFileService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { FileValidationPipe } from '../shared/pipes/file-validation-pipe';

@ApiTags('Import Export')
@Controller()
export class UploadExcelFileController {
  constructor(private uploadExcelFileService: UploadExcelFileService) {}

  @Public()
  @Post('/import-file-excel')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'files',
        filename: editFileName,
      }),
      fileFilter: excelFileFilter,
    }),
  )
  async uploadFileExcel(@UploadedFile(new FileValidationPipe()) file: Express.Multer.File) {
    return await this.uploadExcelFileService.uploadFileExcel(file);
  }

  @Public()
  @Get('/export-file-excel')
  async generateExcel(@Res() res) {
    const response = await this.uploadExcelFileService.generateExcel();
    return { res: res.download(response), message: 'SUCCESSFUL' };
  }
}
