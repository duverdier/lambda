import { HttpException } from '@nestjs/common';

export const filesFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xlsx|xls|xlt|xlsm|txt)$/)) {
    return callback(
      new HttpException(
        'Seuls les fichiers txt et excel sont autorisés !',
        404,
      ),
      false,
    );
  }
  callback(null, true);
};
