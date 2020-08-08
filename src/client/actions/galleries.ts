import { client } from '../client';
import gql from 'graphql-tag';

export type GalleryImage = {
  id: string
  title: string
  description: string
  url: string
}

export type Gallery = {
  id: string
  title: string
  images: GalleryImage[]
}

export type GetImageGalleries = Gallery[]

export async function getImageGalleries(): Promise<GetImageGalleries> {
  const res: any = await client.query({
    query: gql`
      query {
        getImageGalleries(device: 1) {
          galleries {
            id
            title
            images {
              id
              title
              description
              url
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {}
  });
  return res.data.getImageGalleries.galleries;
}

// export type GetGallery = {
//   id: string
//   title: string
//   updatedAt: number
//   createdAt: number
//   slug: string
//   description: string
//   media: {
//     id: string
//     title: string
//     createdAt: number
//     url: string
//     updatedAt: number
//     slug: string
//   }[]
// }

export async function getImageGallery({ id }: { id: string }): Promise<Gallery | undefined> {
  const galleries = await getImageGalleries();

  return galleries.find(
    gallery => gallery.id === id
  );

  // const res: any = await client.query({
  //   query: gql`
  //     query getGallery($id: String!) {
  //       getGallery(id: $id) {
  //         id
  //         title
  //         updatedAt
  //         createdAt
  //         slug
  //         description
  //         media {
  //           id
  //           title
  //           createdAt
  //           url
  //           updatedAt
  //           slug
  //         }
  //       }
  //     }
  //   `,
  //   fetchPolicy: 'no-cache',
  //   variables: {
  //     id
  //   }
  // });

  // return res.data.getGallery;
}