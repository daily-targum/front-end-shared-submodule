import { getAuthorBySlug, getArticles } from '..';
import * as regex from '../../../regex';

let SLUG = '';

describe("authors", () => {

  beforeAll(async (done) => {
    const res = await getArticles({
      category: 'News',
      limit: 1
    });
    SLUG = res.items[0].articles[0].authors[0].slug;
    done();
  });

  it("getAuthor by slug schema", async (done) => {
    const res = await getAuthorBySlug({
      slug: SLUG
    });

    expect(res).toMatchObject({
      author: {
        __typename: "Author",
        id: expect.stringMatching(regex.id),
        displayName: expect.any(String),
      },
      articles: expect.arrayContaining([
        expect.objectContaining({
          category: expect.any(String),
          id: expect.stringMatching(regex.id),
          media: expect.arrayContaining([expect.objectContaining({
            __typename: "Media",
            id: expect.stringMatching(regex.id),
            // @ts-ignore
            title: expect.anyOrNull(String),
            url: expect.any(String)
          })]),
          publishDate: expect.any(Number),
          slug: expect.any(String),
          subcategory: expect.any(String),
          // @ts-ignore
          tags: expect.arrayContainingOrNull([expect.any(String)]),
          title: expect.any(String)
        })
      ])
    });
    done();
  });

});