"use client";

import { useRef } from "react";
import { store } from "@/store";
import { getPostsSuccess } from "@/store/postsSlice";
import { Posts } from "@/store/postsSlice";

function Preloader({ posts }: { posts: Posts[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(getPostsSuccess(posts));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
