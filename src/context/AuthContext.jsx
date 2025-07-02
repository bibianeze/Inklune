// Import required hooks and functions from React
import { createContext, useState, useEffect } from "react";

// Create a context object to share authentication data globally
export const authContext = createContext();

// Define the context provider component
const AuthProvider = ({ children }) => {
  // Define a state to hold the currently logged-in user (initially null)
  const [user, setUser] = useState(null);
  // Define a state to hold the user's token (initially null)
  const [token, setToken] = useState(null);
  // State to track whether the auth check is still loading
  const [loading, setLoading] = useState(true);

  // This useEffect runs once on component mount
  useEffect(() => {
    // Try to retrieve stored token from localStorage
    const storedToken = localStorage.getItem("accessToken");
    // Try to retrieve stored user from localStorage
    const storedUser = localStorage.getItem("user");

    // If both token and user exist in localStorage, update the state
    if (storedToken && storedUser) {
      setToken(storedToken); // Set the token
      setUser(JSON.parse(storedUser)); // Parse and set the user
    }

    // Mark loading as false after checking localStorage
    setLoading(false);
  }, []);

  // Function to log a user in
  const login = (accessToken, user) => {
    setToken(accessToken); // Store token in state
    setUser(user); // Store user in state
    localStorage.setItem("accessToken", accessToken); // Save token in localStorage
    localStorage.setItem("user", JSON.stringify(user)); // Save user in localStorage
  };

  // Function to log a user out
  const logout = () => {
    setToken(null); // Clear token from state
    setUser(null); // Clear user from state
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // Function to update the current user details
  const updateUser = (updatedUser) => {
    setUser(updatedUser); // Update state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save updated user in localStorage
  };

  // The component returns a context provider wrapping all children components
  // This makes `user`, `token`, `login`, `logout`, `loading`, and `updateUser` available anywhere in the app
  return (
    <authContext.Provider
      value={{ login, logout, user, token, loading, updateUser }}
    >
      {children}
    </authContext.Provider>
  );
};

// Export the provider so it can be used to wrap the app in main.jsx or App.jsx
export default AuthProvider;
