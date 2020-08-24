import { client } from '../client';
import gql from 'graphql-tag';
import { Article } from './articles';

export interface GetAuthorPage {
  articles: Pick<Article, 'id' | 'slug' | 'tags' | 'title' | 'publishDate' | 'subcategory' | 'media' | 'authors' | 'category'>[]
  author: {
    id: string
    displayName: string
    headshot?: string
  }
}

export async function getAuthorBySlug({
  slug
}: {
  slug: string
}): Promise<GetAuthorPage | undefined> {
  let res: any;
  
  try {
    res = await client.query({
      query: gql`
        query getAuthorBySlug($slug: String!) {
          getAuthorBySlug(slug: $slug){
            articles {
              id
              slug
              tags
              title
              publishDate
              subcategory
              category
              media {
                id
              }
              authors {
                id
              }
            }
            author {
              id
              displayName
              headshot
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: {
        slug
      }
    });
  } catch(e) {
    return undefined;
  }

  return res.data.getAuthorBySlug;
}