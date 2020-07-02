import { client } from '../client';
import gql from 'graphql-tag';
import { Article } from './articles';

export interface GetAuthorPage {
  articles: Article[]
  author: {
    id: string
    display_name: string
    headshot: string
  }[]
}

export async function getAuthorPage({
  author
}: {
  author: string
}): Promise<GetAuthorPage> {
  const res: any = await client.query({
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
            display_name
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
  return res.data.getAuthorPage;
}