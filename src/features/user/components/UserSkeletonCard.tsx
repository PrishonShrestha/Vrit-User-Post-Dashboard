const UserSkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-gray-300 p-6 shadow-sm h-75 w-full">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gray-300" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-300" />

          <div className="h-3 w-1/3 rounded bg-gray-200" />

          <div className="h-3 w-2/3 rounded bg-gray-200" />

          <div className="h-3 w-1/2 rounded bg-gray-200" />

          <div className="h-3 w-3/4 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-4 h-10 w-full rounded-xl bg-gray-200" />

      <div className="mt-5 h-10 w-full rounded-xl bg-gray-300" />
    </div>
  );
};

export default UserSkeletonCard;
