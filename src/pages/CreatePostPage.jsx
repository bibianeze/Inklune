import React, { useState } from "react";
import Navbar3 from "../components/Navbar3";
import { CirclePlus } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePostPage = () => {
  const { user, token } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    media: null, // ← now a File object
    description: "",
    category: "",
    tag: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, media: file });
      setImagePreview(URL.createObjectURL(file)); // Set preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required.";
    if (!formData.media) newErrors.media = "Media file is required.";
    if (!formData.description.trim())
      newErrors.description = "Story is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.tag.trim()) newErrors.tag = "Tag is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("image", formData.media); // File object
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("tag", formData.tag); // Assuming it's comma-separated

      const response = await axios.post(
        "http://localhost:3000/api/blog",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setIsSubmitting(false);
        setFormData({
          title: "",
          subtitle: "",
          media: null,
          description: "",
          category: "",
          tag: "",
        });
        setImagePreview(null);
        toast.success("Blog created successfully");
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error(
        error?.response?.data?.message || "An error occurred while posting"
      );
    }
  };

  return (
    <div>
      <Navbar3 />
      <div className="container mx-auto w-11/12 py-6 text-[rgba(142,142,142,1)]">
        <div>
          <p className="my-4">Draft in {user?.fullName}...</p>
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
            {/* subtitle */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center relative">
                <CirclePlus className="absolute ml-3" />
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="subtitle"
                  className="pl-10 rounded-xl font-medium text-[20px]  p-4 w-full border"
                />
              </div>
              {errors.subtitle && (
                <span className="text-red-500 text-sm">{errors.subtitle}</span>
              )}
            </div>

            {/* Media */}

            <div className="flex flex-col gap-1">
              <div className="flex items-center relative">
                <CirclePlus className="absolute ml-3" />
                <input
                  type="file"
                  name="media"
                  accept="image/*"
                  onChange={handleChange}
                  className="pl-10 py-2 rounded-xl w-full border"
                />
              </div>
              {errors.media && (
                <span className="text-red-500 text-sm">{errors.media}</span>
              )}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-[350px] w-full object-cover rounded-md mt-2"
                />
              )}
            </div>

            {/* Story */}
            <div className="flex flex-col gap-1">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell your story"
                className="w-full border rounded-xl h-[250px] p-4"
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
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
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="Add Tags"
                  className="pl-10 py-2 rounded-xl w-full sm:w-1/2 border"
                />
              </div>
              {errors.tag && (
                <span className="text-red-500 text-sm">{errors.tag}</span>
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing...." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
