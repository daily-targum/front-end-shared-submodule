import { client } from '../client';
import gql from 'graphql-tag';

export interface GetArticles {
  items: {
    id: string
    title: string
    author: string[]
    media: string
    publishDate: string
    tags: string[]
  }[]
  nextToken: string
}

export async function getArticles({
  category,
  nextToken = '',
  limit = 20
}: {
  category: string,
  nextToken?: string,
  limit?: number
}): Promise<GetArticles> {
  const res: any = await client.query({
    query: gql`
      query getArticles($category: String!, $nextToken: String!, $limit: Int!) {
        getArticles(category: $category, limit: $limit, nextToken: $nextToken){
          items {
            id
            title
            authors
            media
            publishDate
            tags
          }
          nextToken
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      category,
      nextToken,
      limit
    }
  });
  return res.data.getArticles;
}

export interface GetArticle {
  id: string
  slug: string
  title: string
  authors: string[]
  media: string
  publishDate: string
  updatedAt: string
  body: string,
  category: string
  abstract: string
}

export async function getArticle({
  id
}: {
  id: string
}): Promise<GetArticle> {
  const res: any = await client.query({
    query: gql`
      query getArticle($id: ID!) {
        getArticle(id: $id) {
          id
          slug
          title
          authors
          media
          publishDate
          updatedAt
          body
          category
          abstract
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      id
    }
  });
  return res.data.getArticle;
}