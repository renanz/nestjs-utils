import * as AWS from 'aws-sdk';
import { AppAwsConfigService, InjectAppAwsConfigService } from './app-aws-config';

export class AppAwsService {
  private s3: AWS.S3;

  constructor(@InjectAppAwsConfigService() configService: AppAwsConfigService) {
    AWS.config.update({
      region: 'us-east-1',
    });
    const s3Options: AWS.S3.ClientConfiguration = {
      signatureVersion: 'v4',
      region: 'us-east-1',
    };
    console.log(
      'accessKeyId secretAccessKey',
      configService.accessKeyId && configService.secretAccessKey,
    );
    if (configService.accessKeyId && configService.secretAccessKey) {
      s3Options.credentials = {
        accessKeyId: configService.accessKeyId,
        secretAccessKey: configService.secretAccessKey,
      };
    }

    this.s3 = new AWS.S3(s3Options);
  }

  public listAllKeys(
    params: AWS.S3.ListObjectsV2Request,
    allKeys: AWS.S3.ObjectList = [] as AWS.S3.Object[],
  ) {
    let keys: AWS.S3.ObjectList = [...allKeys];
    const listParams = { ...params };

    return new Promise<AWS.S3.ObjectList>((resolve, reject) => {
      this.s3.listObjectsV2(
        listParams,
        async (err: AWS.AWSError, data: AWS.S3.ListObjectsV2Output) => {
          if (err) {
            return reject(err);
          }
          keys = [...keys, ...(data.Contents || [])];
          if (!data.IsTruncated) {
            return resolve(keys);
          }
          listParams.ContinuationToken = data.NextContinuationToken;
          return resolve(await this.listAllKeys(listParams, keys));
        },
      );
    });
  }

  public getObject(Key: string, Bucket: string) {
    const params: AWS.S3.GetObjectRequest = {
      Key,
      Bucket,
    };
    return this.s3.getObject(params).promise();
  }
}
