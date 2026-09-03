"use client";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { storage } from "@/lib/firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { updateArticle } from "@/lib/actions/articles";
import { ArticleType } from "@/types/article";

const TEXTAREA_STYLE =
  "outline outline-1 outline-gray-300 focus:outline-blue-300 focus:outline-2 w-full bg-transparent";

export default function ArticleEditor({
  initialArticle,
}: {
  initialArticle: ArticleType;
}) {
  const [article, setArticle] = useState(initialArticle);
  const [hasSaved, setHasSaved] = useState(true);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [imageChange, setImageChange] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) {
      setPreviewURL(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewURL(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onChangeField =
    (field: keyof ArticleType) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setArticle((prev) => ({ ...prev, [field]: e.target.value }));
      setHasSaved(false);
    };

  const clearImage = () => {
    setImage(null);
    setPreviewURL(null);
    setImageChange(true);
    setHasSaved(false);
    setArticle((prev) => ({ ...prev, image_url: null as unknown as string }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      let update = { ...article };

      if (imageChange) {
        if (image) {
          const imageRef = ref(storage, `images/${article.id}`);
          await uploadBytes(imageRef, image, {
            contentType: image.type,
            cacheControl: "public, max-age=31536000",
          });
          update = { ...update, image_url: await getDownloadURL(imageRef) };
          setImage(null);
          setPreviewURL(null);
        } else if (!update.image_url) {
          try {
            await deleteObject(ref(storage, `images/${article.id}`));
          } catch (e: any) {
            if (e?.code !== "storage/object-not-found") console.error(e);
          }
        }
        setImageChange(false);
      }

      await updateArticle(update);
      setArticle(update);
      setHasSaved(true);
    } catch (e) {
      setError((e as Error)?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-[90%] mx-auto lg:max-w-[55%] flex flex-col gap-2">
      <h1 className="text-5xl font-bold">Edit Article</h1>
      <hr className="text-gray-300 mb-2" />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || hasSaved}
          className="enabled:hover:underline enabled:hover:cursor-pointer disabled:opacity-50"
        >
          {saving ? "Saving..." : hasSaved ? "Saved" : "Save"}
        </button>
      </div>

      <TextareaAutosize
        placeholder="Section"
        className={`${TEXTAREA_STYLE} text-lg text-orange-400`}
        value={article.section ?? ""}
        onChange={onChangeField("section")}
      />
      <TextareaAutosize
        placeholder="Title"
        className={`${TEXTAREA_STYLE} italic text-4xl font-bold`}
        value={article.title ?? ""}
        onChange={onChangeField("title")}
      />
      <TextareaAutosize
        placeholder="Description"
        className={`${TEXTAREA_STYLE} italic text-xl`}
        value={article.description ?? ""}
        onChange={onChangeField("description")}
      />

      {article.image_url && !imageChange && (
        <div className="max-w-full mx-auto my-2 relative">
          <img
            src={article.image_url}
            alt={article.title}
            className="block mx-auto max-w-full h-auto rounded"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 text-3xl z-20 text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      )}
      {!image && (imageChange || !article.image_url) && (
        <div className={`${TEXTAREA_STYLE} relative`}>
          <input
            type="file"
            ref={fileRef}
            className="w-full file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2 hover:file:bg-gray-200"
            onChange={(e) => {
              setImage(e.target.files?.[0] ?? null);
              setImageChange(true);
              setHasSaved(false);
            }}
          />
        </div>
      )}
      {image && imageChange && previewURL && (
        <div className="max-w-full mx-auto my-2 relative">
          <img
            src={previewURL}
            className="block mx-auto max-w-full h-auto rounded"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 text-3xl z-20 text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full flex items-center gap-2">
        <h2 className="text-lg">By</h2>
        <TextareaAutosize
          placeholder="Author"
          className={`${TEXTAREA_STYLE} text-lg`}
          value={article.author ?? ""}
          onChange={onChangeField("author")}
        />
      </div>

      <TextareaAutosize
        placeholder="Content"
        minRows={10}
        className={`${TEXTAREA_STYLE} text-xl whitespace-pre-wrap`}
        value={article.content ?? ""}
        onChange={onChangeField("content")}
      />
    </div>
  );
}
