import { useContext } from "react";
import { blogContext } from "../context/BlogContext";

export const useBlogContext = () => useContext(blogContext);
