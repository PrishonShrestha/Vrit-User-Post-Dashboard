import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "../types/user.types";

export const fetchUsersThunk = createAsyncThunk<UserType[]>(
  "fetchUsers",
  async () => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return response.data;
    };
    return await fetchUsers();
  },
);

interface UserState {
  users: UserType[];
  isLoading: boolean;
  error: string | null;
  selectedUser: UserType | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setSelectedUser, clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
