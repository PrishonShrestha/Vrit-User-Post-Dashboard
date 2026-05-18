import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PostType } from "../types/post.types";

export const fetchPostsThunk = createAsyncThunk<PostType[], number>(
  "fetchPosts",
  async (userId: number) => {
    const fetchPosts = async (userId: number) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return response.data;
    };
    return await fetchPosts(userId);
  },
);

interface PostsState {
  posts: PostType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default postsSlice.reducer;
