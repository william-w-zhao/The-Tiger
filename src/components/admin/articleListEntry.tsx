"use client";
import { useState, Fragment } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { deleteArticle } from "@/lib/actions/articles";
import { ArticleType } from "@/types/article";

export default function ArticleListEntry({
  article,
  removeArticle,
}: {
  article: ArticleType;
  removeArticle: (articleID: string) => void;
}) {
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async (articleID: string) => {
    setIsDeleteOpen(false);
    await deleteArticle(articleID);
    removeArticle(articleID);
  };

  return (
    <div className="flex justify-between pt-1 pb-2 px-2 even:bg-gray-100">
      <div className="flex-col">
        <Link
          href={`/articles/${article.slug}`}
          className="italic text-2xl font-bold hover:underline hover:cursor-pointer hover:text-blue-600 active:text-blue-800"
        >
          {article.title}
        </Link>
        <h2 className="italic text-lg text-gray-500">{article.description}</h2>
        <p className="text-l text-gray-500">By {article.author}</p>
      </div>

      <div className="flex items-center gap-1">
        <Link href={`/admin/articles/${article.slug}`}>
          <FaRegPenToSquare className="text-gray-400 hover:text-black hover:cursor-pointer active:text-gray-400" />
        </Link>
        <button onClick={() => setIsDeleteOpen(true)}>
          <FaRegTrashCan className="text-gray-400 hover:text-red-400 hover:cursor-pointer active:text-gray-400" />
        </button>
      </div>

      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDeleteOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
                <DialogTitle className="font-bold text-lg">
                  Delete article?
                </DialogTitle>
                <p className="mt-2">
                  <span className="font-semibold">
                    &quot;{article.title}&quot;
                  </span>{" "}
                  will be deleted forever. This cannot be undone.
                </p>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={() => setIsDeleteOpen(false)}
                    className="font-semibold hover:underline hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="font-semibold text-red-500 hover:underline hover:cursor-pointer"
                  >
                    Delete Forever
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
