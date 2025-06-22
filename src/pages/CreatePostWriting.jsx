import React, { useState } from "react";
import Navbar3 from "../components/Navbar3";
import createimg from "../assets/Frame 2147223357.png";
import { CirclePlus } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreatePostWriting = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    category: "",
    tags: "",
  });

  const [errors, setErrors] = useState({
    category: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on typing
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }
    if (!formData.tags.trim()) {
      newErrors.tags = "Tags are required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Publishing with:", formData);
      // Proceed with submission logic
    }
  };

  return (
    <div>
      <Navbar3 />
      <div className="container mx-auto w-11/12 py-6">
        <div className="space-y-4">
          <p className="text-[rgba(142,142,142,1)]">
            Saved in {user?.fullName}...
          </p>
          <div className="flex flex-col gap-3">
            <div className="p-3 border rounded-xl border-[rgba(142,142,142,1)] space-y-3">
              <h1 className="text-3xl sm:text-5xl font-bold">
                Tom's Redemption
              </h1>
              <div>
                <p className="text-[rgba(142,142,142,1)]">
                  A Story of Pain, Secrets, and the Long Road to Healing
                </p>
                <h3 className="font-semibold text-lg sm:text-xl">
                  By {user?.fullName}
                </h3>
              </div>
            </div>

            <div>
              <img
                src={createimg}
                className=" w-full"
                alt="Story illustration"
              />
            </div>

            <div className="border space-y-4 p-3 border-[rgba(142,142,142,1)] text-[rgba(142,142,142,1)] rounded-xl">
              <h3 className="font-bold text-xl">The Perfect Lie</h3>
              <p className="w-full sm:w-[80%]">
                From the outside, the Ajayi family was flawless. A mansion with
                golden gates. A father whose suits cost more than a teacher’s
                salary. A mother so elegant, she turned heads at every PTA
                meeting. And Tomiwa a.k.a Tomy to friends and loved ones, the
                adored only son, living a dream life most boys envied
              </p>
              <p>But behind the polished front door, chaos brewed.</p>
            </div>

            <form onSubmit={handlePublish} className="space-y-4">
              {/* Category Input */}
              <div className="flex flex-col gap-1 text-[rgba(142,142,142,1)]">
                <div className="flex items-center relative">
                  <CirclePlus className="absolute ml-3" />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Add Category"
                    className="pl-10 py-2 rounded-xl w-full sm:w-1/2 border"
                  />
                </div>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    {errors.category}
                  </span>
                )}
              </div>

              {/* Tags Input */}
              <div className="flex flex-col gap-1 text-[rgba(142,142,142,1)]">
                <div className="flex items-center relative">
                  <CirclePlus className="absolute ml-3" />
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Add Tags"
                    className="pl-10 py-2 rounded-xl w-full sm:w-1/2 border"
                  />
                </div>
                {errors.tags && (
                  <span className="text-red-500 text-sm">{errors.tags}</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm mt-6">
                <button
                  type="button"
                  className="py-3 rounded-xl w-full sm:w-80 bg-[rgba(51,51,51,1)] text-white"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="py-3 rounded-xl w-full sm:w-80 text-white bg-[rgba(138,99,247,1)]"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostWriting;
