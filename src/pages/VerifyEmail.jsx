import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    const handleVerify = async () => {
      const response = await axios.post(
        `http://localhost:3000/api/auth/verify-email/${token}`,
        { token }
      );
      if (response.status === 200) {
        redirect("/login");
      }
    };
    handleVerify()
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[500px] rounded-lg ">
        <p>email verified</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
