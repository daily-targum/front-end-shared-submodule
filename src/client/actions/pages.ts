import { client, previewClient } from '../client';
import gql from 'graphql-tag';

export interface GetPage {
  id: string;
  title: string;
  published: string;
  slug: string;
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

export async function getPagePreview({
  id
}: {
  id: string
}): Promise<GetPage | undefined> {
  
  let res: any;
  
  try {
    res = await previewClient.getEntry(id);
  } catch(err) {
    return undefined;
  }

  const { documentToHtmlString } = await import('@contentful/rich-text-html-renderer');

  const { fields, sys } = res;

  return {
    id: sys.id,
    title: fields.title,
    published: sys.publishedAt,
    slug: fields.slug,
    formattedSlug: fields.slug,
    content: documentToHtmlString(fields.body),
  };

}
