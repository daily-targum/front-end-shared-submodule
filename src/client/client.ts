// ENVIRONMENT VARIABLES
import { createClient } from './contentful';

import * as secrets from '../secrets';

import ApolloClient from 'apollo-client';
import { authLink } from 'aws-appsync-auth-link/lib/auth-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const previewClient = createClient({
  host: 'preview.contentful.com',
  space: secrets.CONTENTFUL_SPACE,
  accessToken: secrets.CONTENTFUL_ACCESS_TOKEN_DRAFTS
});

const httpLink = createHttpLink({ uri: secrets.AWS_APPSYNC_URL });

const link = authLink({
  url: secrets.AWS_APPSYNC_URL,
  region: secrets.AWS_APPSYNC_REGION,
  auth: {
    type: 'API_KEY',
    apiKey: secrets.AWS_APPSYNC_API_KEY,
  },
})

export const client = new ApolloClient({
  link: link.concat(httpLink),
  cache: new InMemoryCache()
})