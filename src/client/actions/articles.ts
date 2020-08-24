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
  limit = 20,
  lastEvaluatedKey = '',
  lastPublishDate = 0
}: {
  category: string
  limit?: number
  lastEvaluatedKey?: string
  lastPublishDate?: number
}): Promise<GetArticles> {
  const res: any = await client.query({
    query: gql`
      query getArticles($category: String!, $limit: Int! ${lastEvaluatedKey ? ', $lastEvaluatedKey: String!, $lastPublishDate: Int!' : ''}) {
        getArticles(category: $category, limit: $limit ${lastEvaluatedKey ? ', lastEvaluatedKey: $lastEvaluatedKey, lastPublishDate: $lastPublishDate' : ''}){
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
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      category,
      limit,
      lastEvaluatedKey,
      lastPublishDate
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
    authors: res.fields.authors?.map((a: any) => ({
      id: a.sys.id,
      displayName: a.fields.displayName,
      slug: '',
    })),
    media: [{
      id: res.fields.image?.fields.image.sys.id ?? '',
      url: res.fields.image?.fields.image.fields.file?.url ?? '',
      title: 'Untitled Image'
    }],
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


export type GetArticlesBySubcategory = Pick<Article, 'id' | 'slug' | 'tags' | 'title' | 'publishDate' | 'subcategory' | 'media' | 'authors' | 'category'>[];

export async function getArticlesBySubcategory({
  subcategory,
  limit = 50,
  lastEvaluatedKey = '',
  lastPublishDate = 0
}: {
  subcategory: string
  limit?: number
  lastEvaluatedKey?: string
  lastPublishDate?: number
}): Promise<GetArticlesBySubcategory> {
  const res: any = await client.query({
    query: gql`
      query getArticles($subcategory: String!, $limit: Int! ${lastEvaluatedKey ? ', $lastEvaluatedKey: String!, $lastPublishDate: Int!' : ''}) {
        getArticlesBySubcategory(subcategory: $subcategory, limit: $limit ${lastEvaluatedKey ? ', lastEvaluatedKey: $lastEvaluatedKey, lastPublishDate: $lastPublishDate' : ''}){
          id
          slug
          tags
          title
          publishDate
          subcategory
          category
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
      limit,
      lastEvaluatedKey,
      lastPublishDate
    }
  });
  return res.data.getArticlesBySubcategory;
}