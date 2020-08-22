import { client, previewClient } from '../client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import gql from 'graphql-tag';


type Media = {
  id: string
  title: string
  url: string
}

export type Author = {
  id: string
  displayName: string
  slug: string
  headshot?: string
}

export interface Article {
  id: string;
  title: string;
  authors: Author[];
  media: Media[];
  publishDate: number;
  tags: string[];
  slug: string;
  category: string;
  subcategory: string;
}

export interface GetArticles {
  columnists: Author[]
  subcategories: string[]
  items: {
    name: string
    articles: Article[]
  }[]
  nextToken: string;
}

export async function getArticles({
  category,
  nextToken = '',
  limit = 50
}: {
  category: string,
  nextToken?: string,
  limit?: number
}): Promise<GetArticles> {
  const res: any = await client.query({
    query: gql`
      query getArticles($category: String!, $nextToken: String!, $limit: Int!) {
        getArticles(category: $category, limit: $limit, nextToken: $nextToken){
          columnists {
            id
            displayName
            slug
            headshot
          }
          subcategories
          items {
            name
            articles {
              id
              slug
              tags
              title
              publishDate
              subcategory
              media {
                id
                title
                url
              }
              authors {
                id
                displayName
              }
            }
            nextToken
          }
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
  authors: Author[];
  media: Media[];
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
            tags
            title
            publishDate
            updatedAt
            body
            category
            abstract
            media {
              id
              url
            }
            authors {
              id
              displayName
              slug
            }
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
            tags
            title
            publishDate
            updatedAt
            body
            category
            abstract
            media {
              id
              url
            }
            authors {
              id
              displayName
              slug
            }
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
  return id ? res.data.getArticle : res.data.getArticleBySlug;
}

export async function getArticlePreview({
  id
}: {
  id: string
}): Promise<GetArticle> {
  const res: any = await previewClient.getEntry(id);

  const { documentToHtmlString } = await import('@contentful/rich-text-html-renderer');

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
  high: Pick<Article, 'id' | 'title' | 'category' | 'authors' | 'media' | 'publishDate' | 'slug'>[];
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
            category
            authors {
              id
              displayName
              slug
            }
            media {
              id
              title
              url
            }
            publishDate
            slug
          }
          insideBeat {
            id
            title
            authors {
              id
              displayName
              slug
            }
            media {
              id
              title
              url
            }
            publishDate
            tags
            slug
          }
          opinions {
            id
            title
            authors {
              id
              displayName
              slug
            }
            media {
              id
              title
              url
            }
            publishDate
            tags
            slug
          }
          sports {
            id
            title
            authors {
              id
              displayName
              slug
            }
            media {
              id
              title
              url
            }
            publishDate
            tags
            slug
          } 
          news {
            id
            title
            authors {
              id
              displayName
              slug
            }
            media {
              id
              title
              url
            }
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


export type GetArticlesBySubcategory = Pick<Article, 'id' | 'slug' | 'tags' | 'title' | 'publishDate' | 'subcategory' | 'media' | 'authors'>[];

export async function getArticlesBySubcategory({
  subcategory,
  // nextToken = '',
  limit = 50
}: {
  subcategory: string,
  // nextToken?: string,
  limit?: number
}): Promise<GetArticlesBySubcategory> {
  const res: any = await client.query({
    query: gql`
      query getArticles($subcategory: String!, $limit: Int!) {
        getArticlesBySubcategory(subcategory: $subcategory, limit: $limit){
          id
          slug
          tags
          title
          publishDate
          subcategory
          media {
            id
            title
            url
          }
          authors {
            id
            displayName
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      subcategory,
      // nextToken,
      limit
    }
  });
  return res.data.getArticlesBySubcategory;
}