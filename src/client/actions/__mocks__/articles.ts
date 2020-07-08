import { GetArticle, GetArticles } from '../articles';

export const ARTICLE: GetArticle = {
  id: "05db0666-e54c-4a8d-a8e5-b9649ca36948",
  slug: "rutgers-ncaa-tournament-hopes-depend-on-team-wide-performance",
  title: "Rutgers' NCAA Tournament hopes depend on team-wide performance",
  authors: ["Jon Doe"],
  media: ["https://snworksceo.imgix.net/rdt/bb7e35ca-1fbf-4b4e-8b9b-c4daa6d0ce33.sized-1000x1000.JPG"],
  publishDate: 1588602920,
  updatedAt: 1588602920,
  body: "",
  category: "News"
};

export function getArticles({
  limit = 20
}: {
  limit: number
}): Promise<GetArticles> {
  let items = [];
  for(let i = 0; i < limit; i++) {
    items.push(ARTICLE as any);
  }
  return (async () => ({
    items,
    nextToken: 'asdfpoawejfoad',
    columnists: []
  }))();
}

export function getArticle(): Promise<GetArticle> {
  return (async () => ARTICLE)();
}