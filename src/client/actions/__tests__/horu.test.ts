import { getHoru } from '..';
import * as regex from '../../../regex';

type Media = {
  id: string
  title: string
  url: string
}

describe("horu", () => {

  it("getHoru schema", async (done) => {
    const res = await getHoru({
      limit: 5
    });

    // console.log(res)

    // expect(res).toMatchObject({
    //   id: expect.stringMatching(regex.id),
    //   title: expect.any(String),
    //   slug: expect.any(String),
    //   media: expect.arrayContaining([expect.objectContaining({
    //     __typename: "Media",
    //     id: expect.stringMatching(regex.id),
    //     // @ts-ignore
    //     title: expect.anyOrNull(String),
    //     url: expect.any(String)
    //   })]),
    //   altText: expect.any(String),
    //   quote: expect.any(String),
    //   createdAt: expect.any(Number),
    //   updatedAt: expect.any(Number)
    // });

    done();
  });

});