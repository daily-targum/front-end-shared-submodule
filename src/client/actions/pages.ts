import { client } from '../client';
import gql from 'graphql-tag';

export interface GetPage {
  id: string;
  title: string;
  published: string;
  formattedSlug: string;
  content: string;
}

export async function getPage({
  slug
}: {
  slug: string
}): Promise<GetPage> {
  const res: any = await client.query({
    query: gql`
      query getPageBySlug($slug: String!) {
        getPageBySlug(slug: $slug){
          id
          title
          published
          slug
          formattedSlug
          content
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      slug
    }
  });
  return res.data.getPageBySlug[0];
}
