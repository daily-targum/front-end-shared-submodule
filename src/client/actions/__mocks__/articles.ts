import { GetArticle, GetArticles } from '../articles';

const ARTICLE = {
  id: "05db0666-e54c-4a8d-a8e5-b9649ca36948",
  title: "Rutgers' NCAA Tournament hopes depend on team-wide performance",
  author: "Jon Doe",
  media: "https://snworksceo.imgix.net/rdt/bb7e35ca-1fbf-4b4e-8b9b-c4daa6d0ce33.sized-1000x1000.JPG",
  date: "2020-03-11T00:00:00.000Z",
  url: "https://www.dailytargum.com/article/2020/03/rutgers-womens-basketball-ncaa-tournament-hopes-feature-2020",
  content: ""
};

export function getArticles({
  limit = 20
}: {
  limit: number
}): Promise<GetArticles> {
  let items = [];
  for(let i = 0; i < limit; i++) {
    items.push(ARTICLE);
  }
  return (async () => ({
    items,
    nextToken: 'asdfpoawejfoad'
  }))();
}

export function getArticle(): Promise<GetArticle> {
  return (async () => ARTICLE)();
}