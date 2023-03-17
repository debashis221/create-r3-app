"use client";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const Posts = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  return (
    <div>
      {posts &&
        posts.slice(0,2).map((item) => {
          return (
            <div key={item.id}>
              {item.title}
              <p>{item.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
