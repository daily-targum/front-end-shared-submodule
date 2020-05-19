import { getArticles, getArticle } from '..';
import * as regex from '../../../regex';

let ID = '';
let SLUG = '';

describe("getArticles", () => {

  beforeAll(async (done) => {
    const res = await getArticles({
      category: 'News',
      limit: 1
    });
    ID = res.items[0].id;
    SLUG = res.items[0].slug;
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

  it("schema", async (done) => {
    const res = await getArticle({
      slug: SLUG
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