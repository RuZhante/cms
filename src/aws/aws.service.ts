import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { FileInfoDto } from 'src/content/dto/fileInfo.dto';

@Injectable()
export class AwsService {
  async uploadPublicContent(fileInfo: FileInfoDto) {
    const s3 = new S3();
    const myBucket = 'rustem-hosted-content';
    const myKey = fileInfo.fileName;
    const signedUrlExpireSeconds = 60 * 5;
    const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
    });

    return url;
  }
}
