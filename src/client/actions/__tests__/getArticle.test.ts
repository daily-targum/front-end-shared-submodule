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
      title: expect.any(String),
      author: expect.any(String),
      media: expect.stringMatching(regex.url),
      date: expect.stringMatching(regex.dateISO.updated2004.noTimezone),
      content: expect.any(String),
      url: expect.stringMatching(regex.url)
    });
    done();
  });

});