import { getLayoutModules } from "@/lib/queries/layouts";
import { getArticles } from "@/lib/queries/articles";
import HomeEditor from "@/components/admin/homeEditor";

export default async function AdminHome() {
  const modules = await getLayoutModules("home");
  const ids = modules
    .map((module) => Object.values(module.config?.slots ?? {}))
    .flat()
    .filter((id): id is string => Boolean(id));
  // fetches all articles for display and editing
  const articles = await getArticles();
  const articlesByIDs = Object.fromEntries(articles.map((a) => [a.id, a]));

  return (
    <HomeEditor
      initialModules={modules}
      articlesByIDs={articlesByIDs}
    ></HomeEditor>
  );
}
