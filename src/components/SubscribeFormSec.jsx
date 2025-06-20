import React, { useState } from "react";

const SubscribeFormSec = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    // Basic email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!email.trim()) {
      setError("Email is required.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      setSuccess(true);
      console.log("Subscribed with:", email);
      setEmail("");
    }
  };

  return (
    <div className="bg-[rgba(196,192,207,0.1)]">
      <div className="container mx-auto w-11/12 flex flex-col items-center justify-center gap-5 py-12 text-center">
        <h2 className="text-2xl lg:text-4xl font-bold">Stay Inspired</h2>
        <p>
          Receive weekly writing prompts, featured stories, and community
          highlights directly in your inbox.
        </p>

        <form
          className="flex flex-col md:flex-row gap-2 md:gap-4 items-center w-full md:w-auto"
          onSubmit={handleSubmit}
        >
          <input
            className={`border w-full md:w-[550px] p-2 rounded-lg ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[rgba(138,99,247,1)] text-white py-2 px-7 rounded-lg hover:bg-purple-500 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-sm">
            Thanks for subscribing! Check your inbox.
          </p>
        )}

        <p className="text-sm text-gray-500 mt-2">
          By subscribing, you agree to our Privacy Policy and to receive our
          emails.
        </p>
      </div>
    </div>
  );
};

export default SubscribeFormSec;
