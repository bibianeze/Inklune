import React, { useState } from "react";
import Navbar from "../components/Navbar";
import forgotimg from "../assets/Frame 56.png";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirect = useNavigate();

  // Email regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle input
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email");
    } else {
      setError("");
      console.log("Email submitted:", email);
      setIsSubmitting(true);
      // Submit to server here
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/forgot-password",
          { email }
        );
        if ((response.status = 200)) {
          redirect("/confirm-reset");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row justify-center gap-6 items-center min-h-[100vh] pt-20">
        <div className="bg-[rgba(196,192,207,0.1)] w-full hidden md:block md:h-screen p-7 md:p-16">
          <img src={forgotimg} alt="Forgot password illustration" />
        </div>

        <div className="p-12 md:p-25 w-full flex flex-col gap-7">
          <div className="space-y-2">
            <h3 className="font-bold text-[rgba(51,51,51,1)] text-xl">
              Reset Your Password
            </h3>
            <p className="text-sm text-[rgba(51,51,51,1)] font-semibold">
              Type in your registered email address to reset password
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label htmlFor="Email" className="text-[#797171]">
                Email Address:
              </label>
              <input
                className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
                type="email"
                placeholder="Johndoe@example.com"
                name="email"
                id="Email"
                value={email}
                onChange={handleChange}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative cursor-pointer bg-[rgba(138,99,247,1)] flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-purple-400"
            >
              {isSubmitting ? (
                "Sending...."
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

          <Link to="/login">
            <button className="bg-[rgba(51,51,51,1)] text-white px-4 py-2 rounded w-full hover:bg-gray-600">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
