import client from '../client';
import gql from 'graphql-tag';

export interface GetArticles {
  items: {
    id: string
    title: string
    author: string
    media: string
    date: string
    url: string
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
            author
            media
            date
            url
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
  title: string
  author: string
  media: string
  date: string
  content: string,
  url: string
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
          title
          author
          media
          date
          content
          url
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