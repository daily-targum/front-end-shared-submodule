import { client } from '../client';
import gql from 'graphql-tag';
import { Article } from './articles';

export interface GetAuthorPage {
  articles: Article[]
  author: {
    id: string
    displayName: string
    headshot: string
  }[]
}

export async function getAuthorPage({
  author
}: {
  author: string
}): Promise<GetAuthorPage | undefined> {
  let res: any;
  
  try {
    res = await client.query({
      query: gql`
        query getAuthorPage($author: String!) {
          getAuthorPage(author: $author){
            articles {
              id
              title
              authors
              media
              publishDate
              tags
              slug
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
        author
      }
    });
  } catch(e) {
    return undefined;
  }

  return res.data.getAuthorPage;
}