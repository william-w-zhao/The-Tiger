"use client";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { updateArticle } from "@/lib/actions/articles";
import { uploadImage, deleteImage } from "@/lib/actions/images";
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
          const formData = new FormData();
          formData.append("file", image);
          formData.append("articleId", article.id);
          update = { ...update, image_url: await uploadImage(formData) };
          setImage(null);
          setPreviewURL(null);
        } else if (!update.image_url) {
          await deleteImage(article.id);
        }
        setImageChange(false);
      }

      const result = await updateArticle(update);
      update = { ...update, slug: result.slug };
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
    <div>
      <div className="max-w-[90%] mx-auto lg:max-w-[55%] flex flex-col gap-2">
        <div className="flex items-center justify-center relative">
          <h1 className="text-3xl text-center font-bold">EDIT MODE</h1>
          <hr className="text-gray-300 mb-2" />
          <button
            onClick={handleSave}
            disabled={saving || hasSaved}
            className="absolute right-0 enabled:hover:underline enabled:hover:cursor-pointer disabled:opacity-50"
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
          className={`${TEXTAREA_STYLE} text-xl whitespace-pre-wrap`}
          value={article.content ?? ""}
          onChange={onChangeField("content")}
        />
      </div>
    </div>
  );
}
