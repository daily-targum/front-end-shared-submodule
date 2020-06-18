// ENVIRONMENT VARIABLES

// @ts-ignore
// import { createClient } from 'contentful/dist/contentful.browser.min.js';
// import { ContentfulClientApi } from 'contentful';
import * as contentful from 'contentful';

import 'isomorphic-fetch';
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

export const previewClient = contentful.createClient({
  host: 'preview.contentful.com',
  space: secrets.CONTENTFUL_SPACE,
  accessToken: secrets.CONTENTFUL_ACCESS_TOKEN_DRAFTS
});