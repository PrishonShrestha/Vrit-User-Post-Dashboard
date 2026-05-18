"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="rounded-full text-gray-500 hover:bg-gray-200 p-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <IoArrowBack size={32} />
    </button>
  );
};

export default BackButton;
