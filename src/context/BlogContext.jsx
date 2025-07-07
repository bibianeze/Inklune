// Import required React functions
import { createContext, useState, useEffect } from "react";
// Import axios for making HTTP requests
import axios from "axios";

// Create a context object to hold blog-related data
export const blogContext = createContext();

// Define the provider component that will wrap the app
const BlogProvider = ({ children }) => {
  // State to store all the blogs fetched from the backend
  const [blogs, setBlogs] = useState([]);
  // State to show loading spinner or message while fetching
  const [isLoading, setIsLoading] = useState(true);
  // State to manage the search term (for filtering blogs by title)
  const [search, setSearch] = useState("");

  // Function to fetch blogs from the backend API
  const handleGetBlogs = async () => {
    try {
      // Set loading state to true while fetching data
      setIsLoading(true);
      
      // Make a GET request to the blog API with optional search query
      const { data } = await axios(
        `http://localhost:8000/api/blog?title=${search}`
      );

      // Log the response (for debugging)
      console.log(data);

      // Update the blogs state with the fetched blogs
      setBlogs(data.blogs);

      // Set loading state to false after data is fetched
      setIsLoading(false);
    } catch (error) {
      // If there's an error, log it
      console.log(error);
    }
  };

  // useEffect to call handleGetBlogs() every time `search` changes
  useEffect(() => {
    handleGetBlogs();
  }, [search]);

  // Provide `blogs`, `setSearch`, and `isLoading` to all components inside BlogProvider
  return (
    <blogContext.Provider value={{ blogs, setSearch, isLoading }}>
      {children}
    </blogContext.Provider>
  );
};

// Export BlogProvider so it can wrap your app in App.jsx or main.jsx
export default BlogProvider;
