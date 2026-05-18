import { UserType } from "../types/user.types";
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { setSelectedUser } from "../store/userSlice";
import { useRouter } from "next/navigation";
import TextButton from "@/shared/components/TextButton";
import Image from "next/image";

const UserCard = ({ user }: { user: UserType }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = () => {
    dispatch(setSelectedUser(user));
    router.push(`/posts?userId=${user.id}`);
  };
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-emerald-100 via-green-50 to-white p-6 shadow-lg transition hover:shadow-xl">
      <div className="flex items-center gap-4">
        <Image
          height={14}
          width={14}
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt={user.name}
          className="h-14 w-14 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold text-black">{user.name}</h2>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <FaRegUser /> {user.username}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <MdOutlineMail /> {user.email}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <MdOutlineLocalPhone /> {user.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <IoLocationOutline />{" "}
            <p className="truncate whitespace-nowrap">
              {" "}
              {user.address.street}, {user.address.suite},{" "}
              {user.address.city}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3 text-sm text-gray-600">
        <span className="font-bold text-gray-800">Company:</span>{" "}
        {user.company.name}
      </div>

      <TextButton title="View Posts" onClick={() => handleClick()} />

      {/* <button
        onClick={() => handleClick()}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
      >
        View Posts
      </button> */}
    </div>
  );
};

export default UserCard;
