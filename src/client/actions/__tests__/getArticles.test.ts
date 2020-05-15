import { getRandomInt } from '../../../utils';
import { getArticles } from '..';
import * as regex from '../../../regex';

const CAGETORIES = ['News', 'Sports', 'Opinions', 'inside-beat'];

describe("getArticles", () => {

  it("categories", async (done) => {
    let responses = await Promise.all(CAGETORIES.map(async category => {
      return await getArticles({category});
    }))
    responses.forEach(res => {
      expect(res.items.length).toBeGreaterThan(0);
    });
    done();
  });

  it("limit", async (done) => {
    const limit = getRandomInt(1, 30);
    const res = await getArticles({
      category: 'News',
      limit
    });
    expect(res.items.length).toBe(limit);
    done();
  });

  it("nextToken", async (done) => {
    let res = await getArticles({
      category: 'News',
      nextToken: ''
    });
    const nextToken = res.nextToken;
    res = await getArticles({
      category: 'News',
      nextToken
    });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.nextToken).not.toBe(nextToken);
    expect(res.nextToken).toMatch(/.+/);
    done();
  });

  it("schema", async (done) => {
    const res = await getArticles({
      category: 'News'
    });
    res.items.forEach(item => {
      expect(item).toMatchObject({
        id: expect.stringMatching(regex.id),
        title: expect.any(String),
        author: expect.any(String),
        media: expect.stringMatching(regex.url),
        date: expect.stringMatching(regex.dateISO.updated2004.noTimezone),
        url: expect.stringMatching(regex.url),
        __typename: 'Article'
      });
    });
    done();
  });

});