"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextButton from "@/shared/components/TextButton";
import { MdOutlineClose } from "react-icons/md";

const postSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  body: z.string().min(10, "Body must be at least 10 characters"),
});

type PostFormData = z.infer<typeof postSchema>;

interface AddPostModalProps {
  onSubmitPost?: (data: PostFormData) => void;
}

export default function AddPostModal({ onSubmitPost }: AddPostModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPost = { id: Date.now(), ...data };
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));

    if (onSubmitPost) onSubmitPost(newPost);

    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* Open Modal Button */}
      <div>
        <TextButton title="Post" onClick={() => setIsOpen(true)} />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Add Post</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl leading-none cursor-pointer"
              >
                <MdOutlineClose />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  {...register("title")}
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-black"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Body</label>
                <textarea
                  rows={5}
                  placeholder="Enter post body"
                  {...register("body")}
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-black"
                />
                {errors.body && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.body.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border px-5 py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-black px-5 py-2 text-white disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
