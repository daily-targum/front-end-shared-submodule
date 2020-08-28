import { client } from '../client';
import gql from 'graphql-tag';

type Media = {
  id: string
  title: string
  description: string
  url: string
  createdAt: number
  updatedAt: number
  thumbnail: string
  duration: number
}

export interface GetPlaylist {
  title: string
  slug: string
  description: string
  media: Media
}

export async function getPlaylist({
  id
}: {
  id: string
}): Promise<GetPlaylist> {
  const res: any = await client.query({
    query: gql`
      query getPlaylist($id: String!) {
        getPlaylist(id: $id) {
          title
          slug
          description
          media {
            id
            title
            description
            url
            createdAt
            updatedAt
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      id
    }
  });
  return res.data.getPlaylist;
}


export interface GetPlaylists {
  items: {
    id: string
    title: string
    slug: string
    description: string
    media: Media[]
  }[]
}

export async function getPlaylists(): Promise<GetPlaylists> {
  const res: any = await client.query({
    query: gql`
      query {
        getPlaylists(device: 3) {
          items {
            id
            title
            slug
            description
            media {
              id
              title
              url
              description
              createdAt
              updatedAt,
              thumbnail
              duration
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {}
  });
  return res.data.getPlaylists;
}