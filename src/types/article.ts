import type { AuthorType } from './author'

/* explicit type for Article
author: string aids in display
authors: Author[] holds author objects for table join
*/
export type ArticleType = {
    id: string,
    title: string,
    slug: string,
    content: string,
    section: string,
    description: string,
    image_url: string,
    author: string,
    authors: AuthorType[]
}

// export the article information combined with author information from article_authors
export const articleSelect = `
  *,
  article_authors (
    author_order,
    author:authors (*)
  )
`;