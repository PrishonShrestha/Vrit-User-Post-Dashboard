import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/store/userSlice";
import postsReducer from "../features/posts/store/postsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
      posts: postsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
