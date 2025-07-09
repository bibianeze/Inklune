import React, { useState } from "react";
import logo from "../assets/Inklune logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const SignIn = () => {
  const navigate = useNavigate(); // ✅ Declare navigate at the top
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validate fields
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://inklune-blog-server.onrender.com/api/auth/login",
          { ...formData }
        );
        console.log(response);

        if (response.status === 200) {
          toast.success("You are logged in");
          //store user login details and token
          login(response.data.token, response.data.user);

          // ✅ Navigate to the logged-in page
          navigate("/loggedin");
          setIsSubmitting(false);
          setFormData({
            email: "",
            password: "",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        setIsSubmitting(false);
        setFormData({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="container mx-auto w-11/12 min-h-[100vh] flex flex-col gap-4 items-center justify-center py-3">
      <Link to="/"><img className="w-30 md:w-40" src={logo} alt="Inklune Logo" /></Link>
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome Back</h1>
        <p className="text-[rgba(164,164,164,1)] w-[90%]">
          Sign In to continue your writing journey
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-2 border-[rgba(164,164,164,1)] w-full md:w-[50%] lg:w-[40%] p-4 md:p-9 rounded-lg shadow-xl"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-[#797171]">
            Email Address:
          </label>
          <input
            className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
            type="email"
            name="email"
            id="email"
            placeholder="Johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between">
            <label htmlFor="password" className="text-[#797171]">
              Password:
            </label>
            <Link to="/forgot-Password">
              <span className="text-[rgba(164,164,164,1)]">
                Forgot Password?
              </span>
            </Link>
          </div>
          <input
            className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Sign In button */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-[rgba(138,99,247,1)] rounded-lg text-white hover:bg-purple-400 cursor-pointer"
          >
            {isSubmitting ? "Signing in.." : "Sign In"}
          </button>
          <p className="text-center text-[#797171]">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-[rgba(138,99,247,1)]">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
