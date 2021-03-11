// ENVIRONMENT VARIABLES
import * as secrets from '../secrets';

import * as contentful from 'contentful';
export const createClient = contentful.createClient;

import ApolloClient from 'apollo-client';
import { concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";
import ApolloLinkTimeout from 'apollo-link-timeout';


export const previewClient = createClient({
  host: 'preview.contentful.com',
  space: secrets.CONTENTFUL_SPACE,
  accessToken: secrets.CONTENTFUL_ACCESS_TOKEN_DRAFTS
});

const timeoutLink = new ApolloLinkTimeout(5 * 60 * 1000)

const httpLink = createHttpLink({ uri: secrets.AWS_APPSYNC_URL });

const link = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Api-Key': secrets.AWS_APPSYNC_API_KEY
    }
  }
});

export const client = new ApolloClient({
  link: concat(concat(timeoutLink as any, link), httpLink),
  cache: new InMemoryCache()
})