import { getPlaylists, getPlaylist } from '..';
import * as regex from '../../../regex';

describe("videos", () => {

  it("getPlaylists schema", async (done) => {
    const res = await getPlaylists();

    expect(res).toMatchObject({
      items: expect.arrayContaining([expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        slug: expect.any(String),
        description: expect.any(String),
        media: expect.arrayContaining([expect.objectContaining({
          __typename: "Media",
          id: expect.stringMatching(regex.id),
          // @ts-ignore
          title: expect.any(String),
          description: expect.any(String),
          url: expect.any(String),
          thumbnail: expect.any(String),
          duration: expect.any(Number),
          updatedAt: expect.any(Number),
          createdAt: expect.any(Number),
        })]),
      })])
    });

    done();
  });

});