export const editFileName = (req, file, callback) => {
  const fileName = `file_${String(Date.now())}`;
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  callback(null, `${fileName}.${fileExtension}`);
};
