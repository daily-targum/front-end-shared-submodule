// ENVIRONMENT VARIABLES

import 'isomorphic-fetch';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import * as secrets from '../secrets';

export default new AWSAppSyncClient({
  url: secrets.AWS_APPSYNC_URL,
  region: secrets.AWS_APPSYNC_REGION,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: secrets.AWS_APPSYNC_API_KEY,
  },
  disableOffline: true
});