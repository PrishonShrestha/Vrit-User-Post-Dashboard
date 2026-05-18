"use client";
import UserCard from "@/features/user/components/UserCard";
import UserSkeletonCard from "@/features/user/components/UserSkeletonCard";
import { fetchUsersThunk } from "@/features/user/store/userSlice";
import TextButton from "@/shared/components/TextButton";
import SearchBar from "@/shared/components/SearchBar";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { useEffect, useMemo, useState } from "react";
const Home = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  //Filter users based on name and email
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  if (error) return <p className="text-red-500">Something went wrong</p>;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl">Users</h1>
      <div className="flex gap-5">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email"
        />
        <div className="">
          <TextButton title="Post" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <UserSkeletonCard key={i} />
            ))
          : filteredUsers.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })}
        ;
      </div>
    </div>
  );
};

export default Home;
