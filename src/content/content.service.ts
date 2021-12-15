import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { S3 } from 'aws-sdk';
import { Orientation } from './common/orientation';
import { ContentEntity } from './content.entity';
import { v4 as uuid } from 'uuid';
import { CreateContentDto } from './dto/create-content.dto';
import { FileInfoDto } from './dto/fileInfo.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentEntity> {
  constructor(@InjectRepository(ContentEntity) repo) {
    super(repo);
  }

  async getContentsWithParams(
    orientation: Orientation,
    screenResolution: string,
  ): Promise<ContentEntity[]> {
    const contents = await this.repo.find({
      where: { orientation: orientation, screenResolution: screenResolution },
    });
    return contents;
  }

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
    console.log(url);
    return url;

    // const uploadResult = await s3
    //   .upload({
    //     Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
    //     Body: dataBuffer,
    //     Key: `${uuid()}-${filename}`,
    //   })
    //   .promise();

    // const newContent = this.repo.create({
    //   key: uploadResult.Key,
    //   url: uploadResult.Location,
    // });
    // await this.repo.save(newContent);
    // return newContent;
  }

  //   async addContent(contentBuffer: Buffer, fileName: string) {
  //     const content = await this.uploadPublicContent(contentBuffer, fileName);
  //     return content;
  //   }
}
