import { PostType } from "../types/post.types";

const PostCard = ({ post }: { post: PostType }) => {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-sm transition hover:shadow-md">
      <h3 className="text-center font-semibold text-gray-900 leading-snug">
        {post.title}
      </h3>
      <div className="my-4 h-px w-full bg-gray-200" />

      <div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {post.body}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
