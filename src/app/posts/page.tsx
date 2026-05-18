"use client";
import PostCard from "@/features/posts/components/PostCard";
import PostSkeletonCard from "@/features/posts/components/PostSkeletonCard";
import { fetchPostsThunk } from "@/features/posts/store/postsSlice";
import BackButton from "@/shared/components/BackButton";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const PostsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = Number(searchParams.get("userId"));

  const page = Number(searchParams.get("page") || "1");

  const dispatch = useAppDispatch();

  const { posts, isLoading, error } = useAppSelector((state) => state.posts);

  const { selectedUser } = useAppSelector((state) => state.users);

  // Fetch Posts
  useEffect(() => {
    if (userId) {
      dispatch(fetchPostsThunk(userId));
    }
  }, [dispatch, userId]);

  // Pagination
  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * 5;
    const end = start + 5;

    return posts.slice(start, end);
  }, [posts, page]);

  const totalPages = Math.ceil(posts.length / 5);

  // Handle page navigation
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  };

  if (error) return <p className="text-red-400">Something went wrong.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      <div className="flex items-center gap-3 py-4 px-2">
        <BackButton />
        <Image
          src={`https://i.pravatar.cc/150?u=${userId}`}
          alt="User"
          className="ml-3 h-11 w-11 rounded-full object-cover ring-2 ring-gray-100"
        />

        <div>
          <h2 className="  text-gray-900">{selectedUser?.name}</h2>
          <p className="text-sm text-gray-500">{selectedUser?.username}</p>
        </div>
      </div>

      <div className="h-px w-full bg-gray-200" />
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <PostSkeletonCard key={i} />)
        : paginatedPosts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}

      <div className="flex mx-auto gap-2 py-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg border ${
              page === index + 1 ? "bg-black text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
