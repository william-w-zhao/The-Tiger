import { getIssues } from "@/lib/queries/issues";
// remove:  import Link from "next/link";

const IssueCover = ({ pdfUrl, title }: { pdfUrl: string; title: string }) => {
  return (
    <div className="w-full aspect-3/4 bg-gray-100 overflow-hidden">
      <iframe
        src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
        title={title}
        loading="lazy"
        className="w-full h-full border-0 pointer-events-none"
      />
    </div>
  );
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <main className="p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-14">
        {issues.map((issue) => (
          <a
            key={issue.id}
            href={issue.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition"
          >
            <IssueCover pdfUrl={issue.pdf_url} title={issue.title} />
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-center">
              {issue.title}
            </h2>
          </a>
        ))}
      </div>
    </main>
  );
}
