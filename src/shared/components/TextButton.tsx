import { MouseEventHandler } from "react";

interface TextButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const TextButton = ({ title, onClick }: TextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 h-auto w-full bg-black text-white rounded-xl cursor-pointer"
    >
      {title}
    </button>
  );
};

export default TextButton;
