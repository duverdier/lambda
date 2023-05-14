import { HttpException } from '@nestjs/common';

export const excelFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xlsx|xls|csv)$/)) {
    return callback(new HttpException('Seuls les fichiers Excel sont autorisés !', 404), false);
  }
  callback(null, true);
};
