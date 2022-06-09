import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream, mimetype } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "evencafe-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
      ContentType: mimetype,
    })
    .promise();
  return Location;
};

const s3 = new AWS.S3();

export const deleteFromS3 = async (fileUrl, folderName) => {
  const decodedUrl = decodeURI(fileUrl);
  const filePath = decodedUrl.split(`/${folderName}`)[1];
  const fileName = `${folderName}${filePath}`;

  await s3
    .deleteObject({
      Bucket: "evencafe-uploads",
      Key: fileName,
    })
    .promise();
};
