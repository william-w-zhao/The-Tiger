"use client";
import { useState } from "react";
import { ArticleType } from "@/types/article";
import ArticleListEntry from "./articleListEntry";

export default function ArticleList({
  initialArticles,
}: {
  initialArticles: ArticleType[];
}) {
  const [articles, setArticles] = useState(initialArticles);

  const removeArticle = async (articleID: string) => {
    setArticles((articles) =>
      articles.filter((article) => article.id != articleID),
    );
  };

  return (
    <div>
      {articles.map((article) => (
        <ArticleListEntry
          key={article.id}
          article={article}
          removeArticle={removeArticle}
        ></ArticleListEntry>
      ))}
    </div>
  );
}
