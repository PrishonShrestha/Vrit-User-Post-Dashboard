import PostsPage from "@/features/posts/components/PostPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostsPage />
    </Suspense>
  );
}
