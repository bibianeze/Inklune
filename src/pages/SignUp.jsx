import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setIsSubmitting(true);
      // Submit the form (e.g., API call)
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          { ...formData },
        );
        console.log(response);

        if (response.status === 201) {
          // toast success
          toast.success("Registration successful, proceed to verify");
          setIsSubmitting(false);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        setIsSubmitting(false);
      }
    }
  };

  // Update form and clear specific field error
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error message for the field being updated
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  return (
    <div className="container mx-auto w-11/12 min-h-[100vh] flex flex-col gap-2 items-center justify-center py-3">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Create your Account</h1>
        <p className="text-[rgba(164,164,164,1)] md:w-[90%]">
          Join INKLUNE and start sharing your stories with the world
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-2 border-[rgba(164,164,164,1)] w-full md:w-[50%] lg:w-[40%] p-4 md:p-9 rounded-lg shadow-xl"
      >
        {/* Full Name */}
        <div>
          <label htmlFor="fullname" className="text-[#797171]">
            Full Name:
          </label>
          <input
            className="w-full border-2 rounded-lg p-2"
            type="text"
            name="fullName"
            placeholder="John Doe"
            id="fullname"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-[#797171]">
            Email:
          </label>
          <input
            className="w-full border-2 rounded-lg p-2"
            type="email"
            placeholder="Johndoe@example.com"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="text-[#797171]">
            Password:
          </label>
          <input
            className="w-full border-2 rounded-lg p-2"
            type="password"
            placeholder="**********"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="text-[#797171]">
            Confirm Password:
          </label>
          <input
            className="w-full border-2 rounded-lg p-2"
            type="password"
            placeholder="**********"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-[rgba(138,99,247,1)] rounded-lg text-white hover:bg-purple-400"
          >
            {isSubmitting ? "Signing up.." : "Sign up"}
          </button>
          <p className="text-center text-[#797171]">
            Already have an account?{" "}
            <Link to="/login" className="text-[rgba(138,99,247,1)]">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
