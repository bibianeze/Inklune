import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const blogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleGetBlogs = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `http://localhost:3000/api/blog?title=${search}`
      );
      console.log(data);
      setBlogs(data.blogs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetBlogs();
  }, [search]);

  return (
    <blogContext.Provider value={{ blogs, setSearch, isLoading }}>
      {children}
    </blogContext.Provider>
  );
};

export default BlogProvider;
