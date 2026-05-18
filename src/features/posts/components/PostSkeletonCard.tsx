const PostSkeletonCard = () => {
  return (
    <div className="w-full animate-pulse rounded-2xl border border-gray-100 bg-gray-200 p-5 shadow-sm">
      <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded" />

      <div className="my-4 h-px w-full bg-gray-200" />

      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-4/6 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default PostSkeletonCard;
