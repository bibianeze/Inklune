import React, { useState } from "react";
import Navbar3 from "../components/Navbar3";
import { CirclePlus } from "lucide-react";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    media: "",
    story: "",
    category: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.media.trim()) newErrors.media = "Media is required.";
    if (!formData.story.trim()) newErrors.story = "Story is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.tags.trim()) newErrors.tags = "Tags are required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <Navbar3 />
      <div className="container mx-auto w-11/12 py-6 text-[rgba(142,142,142,1)]">
        <div>
          <p className="my-4">Draft in Bibian...</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="h-20 rounded-xl font-bold text-2xl sm:text-4xl p-4 w-full border"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>

            {/* Media */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center relative">
                <CirclePlus className="absolute ml-3" />
                <input
                  type="text"
                  name="media"
                  value={formData.media}
                  onChange={handleChange}
                  placeholder="Add Images, Video, links..."
                  className="pl-10 py-2 rounded-xl w-full border"
                />
              </div>
              {errors.media && (
                <span className="text-red-500 text-sm">{errors.media}</span>
              )}
            </div>

            {/* Story */}
            <div className="flex flex-col gap-1">
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Tell your story"
                className="w-full border rounded-xl h-[250px] p-4"
              ></textarea>
              {errors.story && (
                <span className="text-red-500 text-sm">{errors.story}</span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
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
                <span className="text-red-500 text-sm">{errors.category}</span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm mt-6">
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
  );
};

export default CreatePostPage;
