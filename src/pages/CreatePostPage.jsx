import React, { useState } from "react";
import Navbar3 from "../components/Navbar3";
import { CirclePlus } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const redirect = useNavigate()
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

 // Function to handle changes in form inputs
const handleChange = (e) => {
  // Destructure useful properties from the event target (i.e., the input element that triggered the change)
  const { name, value, files } = e.target;

  // Check if the input field's "name" is "media" (typically for file uploads like images or videos)
  if (name === "media" && files.length > 0) {
    // Get the first file from the uploaded files (only one file is expected)
    const file = files[0];

    // Update the form data state with the new file under the "media" key
    setFormData({
      ...formData, // keep the existing data
      media: file  // update only the media field
    });

    // Generate a preview URL for the uploaded file and store it in a separate state variable
    // This allows you to show a preview (like an image preview) in the UI
    setImagePreview(URL.createObjectURL(file));
  } else {
    // For all other input types (e.g., text, email, password, etc.)
    // Update the form data state with the new value for the specific field
    setFormData({
      ...formData,        // spread the existing form data
      [name]: value       // update the changed field dynamically using the input's "name" attribute
    });
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

// This function handles form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevents the default form reload/refresh behavior

  setErrors({}); // Clear any existing validation errors

  // Run the validate() function to check for client-side form errors
  const validationErrors = validate();

  // If there are validation errors, set them in state and stop the submission
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return; // Exit the function if validation fails
  }

  try {
    setIsSubmitting(true); // Indicate loading/submitting state (e.g., to disable the button)

    // Create a new FormData object to send text and file data
    const data = new FormData();

    // Append each form field to the FormData object
    data.append("title", formData.title);                 // Add the blog title
    data.append("subtitle", formData.subtitle);           // Add the blog subtitle
    data.append("image", formData.media);                 // Add the uploaded image file
    data.append("description", formData.description);     // Add the blog body/description
    data.append("category", formData.category);           // Add the selected category
    data.append("tag", formData.tag);                     // Add the tags (e.g., comma-separated string)

    // Send a POST request to your backend API to create the blog post
    const response = await axios.post(
      "http://localhost:3000/api/blog", // Backend blog creation endpoint
      data,                             // Payload is the FormData object
      {
        headers: {
          Authorization: `Bearer ${token}`,               // Send user token for protected route
          "Content-Type": "multipart/form-data",          // Must specify this to upload files
        },
      }
    );

    // If the blog was successfully created
    if (response.status === 201) {
      setIsSubmitting(false); // Stop showing loading/spinner state

      // Reset form fields and preview
      setFormData({
        title: "",
        subtitle: "",
        media: null,
        description: "",
        category: "",
        tag: "",
      });
      setImagePreview(null); // Clear the image preview

      // Show success message
      toast.success("Blog created successfully");
      redirect("/loggedin")

    }
  } catch (error) {
    console.error(error);        // Log the error in the console
    setIsSubmitting(false);      // Remove loading state

    // Show error message using toast, or a fallback if no message is returned
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
