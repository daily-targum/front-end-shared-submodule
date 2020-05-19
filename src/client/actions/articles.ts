import { client } from '../client';
import gql from 'graphql-tag';

export interface GetArticles {
  items: {
    id: string;
    title: string;
    author: string[];
    media: string[];
    publishDate: string;
    tags: string[];
    slug: string;
  }[]
  nextToken: string;
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
            slug
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



export interface GetArtcileById {
  id: string;
  slug?: string;
}

export interface GetArtcileBySlug {
  slug: string;
  id?: string;
}

export interface GetArticle {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  media: string[];
  publishDate: number;
  updatedAt: number;
  body: string;
  category: string;
  abstract?: string;
}

export async function getArticle({
  id,
  slug
}: GetArtcileById | GetArtcileBySlug): Promise<GetArticle> {
  const res: any = await client.query({
    query: id ? (
      // Get article by id
      gql`
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
      `
    ) : (
      // Get artcile by slug
      gql`
        query getArticleBySlug($slug: String!) {
          getArticleBySlug(slug: $slug) {
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
      `
    ),
    fetchPolicy: 'no-cache',
    variables: {
      id,
      slug
    }
  });
  return id ? res.data.getArticle : res.data.getArticleBySlug?.[0];
}