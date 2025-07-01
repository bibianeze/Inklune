import React, { useState } from "react";
import resetimg from "../assets/pana.png";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const { token } = useParams();
  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  // Validate input
  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Password reset successful:", formData);
      setIsSubmitting(true);
      // Proceed to API or next step
      try {
        const response = await axios.post(
          `http://localhost:8000/api/auth/reset-password`,
          { token, password: formData.password }
        );
        if (response.status === 200) {
          toast.success("Password reset successful");
          redirect("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center gap-6 items-center min-h-[100vh] pt-20 xl:container xl:w-11/12 xl:mx-auto">
        <div className="bg-white w-full hidden md:block p-7 md:p-16">
          <img src={resetimg} alt="Reset illustration" />
        </div>

        <div className="bg-[rgba(196,192,207,0.1)] md:min-h-screen p-12 md:p-25 w-full flex flex-col gap-7">
          <div className="space-y-2">
            <h3 className="font-bold text-[rgba(51,51,51,1)] text-xl">
              Reset Your Password
            </h3>
            <p className="text-sm text-[rgba(51,51,51,1)] font-semibold">
              Type in your new password
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* New password */}
            <div>
              <input
                className="w-full border-2 border-[rgba(164,164,164,1)] p-2"
                type="password"
                placeholder="New Password*"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm new password */}
            <div>
              <input
                className="w-full border-2 border-[rgba(164,164,164,1)] p-2"
                type="password"
                placeholder="Retry new Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative bg-[rgba(138,99,247,1)] flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-purple-400"
            >
              {isSubmitting ? (
                "Resetting...."
              ) : (
                <>
                  Next{" "}
                  <span>
                    <ArrowRight size={16} />
                  </span>
                </>
              )}
            </button>
          </form>

          <button className="bg-[rgba(51,51,51,1)] text-white px-4 py-2 rounded w-full hover:bg-gray-600">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
