import { HttpException } from '@nestjs/common';

export const txtFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(txt)$/)) {
    return callback(
      new HttpException('Seuls les fichiers txt sont autorisés !', 404),
      false,
    );
  }
  callback(null, true);
};
