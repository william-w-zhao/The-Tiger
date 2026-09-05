import HomeLayout from "@/components/layout/homelayout";
import { getArticlesByIDs } from "@/lib/queries/articles";
import { getLayoutModules } from "@/lib/queries/layouts";

export const revalidate = 60;

export default async function Home() {
  const modules = await getLayoutModules("home");
  const ids = modules
    .map((module) => Object.values(module.config?.slots ?? {}))
    .flat()
    .filter((id): id is string => Boolean(id));
  // only fetches articles required for reading
  const articles = await getArticlesByIDs(ids);
  const articlesByIDs = Object.fromEntries(articles.map((a) => [a.id, a]));
  return (
    <HomeLayout
      editMode={false}
      modules={modules}
      articlesByIDs={articlesByIDs}
    ></HomeLayout>
  );
}
