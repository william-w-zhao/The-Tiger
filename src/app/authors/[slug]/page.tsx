import { getAuthorBySlug } from "@/lib/queries/authors";
import Author from "@/components/authors/author";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const author = await getAuthorBySlug(slug);

  if (!author) {
    return <div>Author not found</div>;
  }

  return <Author author={author} />;
}
