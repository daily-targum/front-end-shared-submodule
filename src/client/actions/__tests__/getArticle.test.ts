import { getArticles, getArticle } from '..';
import * as regex from '../../../regex';

let ID = '';

describe("getArticles", () => {

  beforeAll(async (done) => {
    const res = await getArticles({
      category: 'News',
      limit: 1
    });
    ID = res.items[0].id;
    done();
  });

  it("schema", async (done) => {
    const res = await getArticle({
      id: ID
    });
    expect(res).toMatchObject({
      id: expect.stringMatching(regex.id),
      slug: expect.any(String),
      title: expect.any(String),
      authors: expect.arrayContaining([expect.any(String)]),
      media: expect.arrayContaining([expect.stringMatching(regex.url)]),
      publishDate: expect.any(Number),
      updatedAt: expect.any(Number),
      body: expect.any(String),
      category: expect.any(String),
      // abstract: expect.any(String)
    });
    done();
  });

});