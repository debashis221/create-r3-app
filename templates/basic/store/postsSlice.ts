import { createSlice } from "@reduxjs/toolkit";
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Posts {
  posts: Post[];
  status: string;
  error: string | null;
}
const initialState: Posts = {
  posts: [],
  status: "idle",
  error: null,
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state) => {
      state.status = "loading";
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.status = "succeeded";
    },
    getPostsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { getPosts, getPostsFailure, getPostsSuccess } =
  postsSlice.actions;

export default postsSlice.reducer;
