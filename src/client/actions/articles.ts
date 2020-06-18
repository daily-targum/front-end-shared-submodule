import { client, previewClient } from '../client';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import gql from 'graphql-tag';


export interface Article {
  id: string;
  title: string;
  author: string[];
  media: string[];
  publishDate: string;
  tags: string[];
  slug: string;
}

export interface GetArticles {
  items: Article[]
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

export async function getArticlePreview({
  id
}: {
  id: string
}): Promise<GetArticle> {
  const res: any = await previewClient.getEntry(id);
  return {
    id: res.sys.id,
    title: res.fields.title,
    authors: res.fields.authors?.map((a: any) => a.fields.displayName) || [],
    media: res.fields.image?.fields.image.fields.file?.url || '',
    publishDate: dayjs(res.sys.updatedAt, {utc: true}).valueOf() / 1000,
    updatedAt: dayjs(res.sys.updatedAt, {utc: true}).valueOf() / 1000,
    slug: res.fields.slug,
    body: documentToHtmlString(res.fields.body),
    category: '',
    abstract: ''
  }
}

export interface GetHomepage {
  high: Article[];
  insideBeat: Article[];
  opinions: Article[];
  sports: Article[];
  news: Article[];
}

export async function getHomepage(): Promise<GetHomepage> {
  const res: any = await client.query({
    query: gql`
      query {
        getHomepage(device: 0){
          high {
            id
            title
            authors
            media
            publishDate
            tags
            slug
          }
          insideBeat {
            id
            title
            authors
            media
            publishDate
            tags
            slug
          }
          opinions {
            id
            title
            authors
            media
            publishDate
            tags
            slug
          }
          sports {
            id
            title
            authors
            media
            publishDate
            tags
            slug
          } 
          news {
            id
            title
            authors
            media
            publishDate
            tags
            slug
          } 
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {}
  });

  return res.data.getHomepage;
}

