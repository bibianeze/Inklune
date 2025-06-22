import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { CheckCircle } from "lucide-react"; // Optional: if using lucide icons

const VerifyEmail = () => {
  const { token } = useParams();
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/auth/verify-email/${token}`,
          { token }
        );
        if (response.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Verification failed", error);
        // Handle error display if needed
      }
    };
    handleVerify();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <CheckCircle className="text-[#8A63F7] mx-auto mb-4" size={64} />
        <h1 className="text-2xl font-bold text-[#8A63F7] mb-2">
          Email Verified!
        </h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now log in to your
          account.
        </p>
        <button
          onClick={() => redirect("/login")}
          className="bg-[#8A63F7] text-white px-6 py-2 rounded-lg cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
