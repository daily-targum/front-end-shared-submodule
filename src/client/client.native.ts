// ENVIRONMENT VARIABLES

import 'isomorphic-fetch';

// @ts-ignore
export { createClient } from 'contentful/dist/contentful.browser.min.js';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import * as secrets from '../secrets';

export const client = new AWSAppSyncClient({
  url: secrets.AWS_APPSYNC_URL,
  region: secrets.AWS_APPSYNC_REGION,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: secrets.AWS_APPSYNC_API_KEY,
  },
  disableOffline: true
});

// @ts-ignore
export const previewClient = createClient({
  host: 'preview.contentful.com',
  space: secrets.CONTENTFUL_SPACE,
  accessToken: secrets.CONTENTFUL_ACCESS_TOKEN_DRAFTS
});