"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

const AllBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    description: "",
    location: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacityError, setCapacityError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "capacity") {
      // Allow empty string or valid positive numbers
      if (value === "" || (!isNaN(value) && Number(value) > 0)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setCapacityError("");
      } else {
        setCapacityError("Capacity must be greater than 0");
        return;
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  }, []);

  const removeImage = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Final validation before submission
      const capacityNum = Number(formData.capacity);
      if (!capacityNum || capacityNum <= 0) {
        setCapacityError("Capacity must be greater than 0");
        return;
      }

      setIsSubmitting(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("capacity", capacityNum);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("location", formData.location);
        formData.images.forEach((image) => {
          formDataToSend.append("images", image.file);
        });

        const response = await fetch(
          "http://localhost:8081/api/v1/boats/save-boat",
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        alert("Boat saved successfully!");
        setFormData({
          name: "",
          capacity: "",
          description: "",
          location: "",
          images: [],
        });
        setCapacityError("");
      } catch (error) {
        alert("Failed to save boat. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Add New Boat
        </h2>

        <div className="space-y-6">
          {[
            {
              id: "name",
              label: "Boat Name",
              type: "text",
              placeholder: "Enter boat name",
            },
            {
              id: "capacity",
              label: "Capacity",
              type: "number",
              placeholder: "Enter capacity",
              error: capacityError,
            },
            {
              id: "location",
              label: "Location",
              type: "text",
              placeholder: "Enter location",
            },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700/50 border ${
                  field.error ? "border-red-500" : "border-gray-600"
                } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                placeholder={field.placeholder}
                required
                {...(field.id === "capacity" && { min: 1 })}
              />
              {field.error && (
                <p className="mt-1 text-sm text-red-500">{field.error}</p>
              )}
            </div>
          ))}

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Describe the boat..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Images
            </label>
            <div className="relative">
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                multiple
                className="hidden"
              />
              <label
                htmlFor="images"
                className="flex items-center justify-center w-full px-4 py-3 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-indigo-500 hover:text-indigo-400 cursor-pointer transition-all duration-200"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Images
              </label>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || capacityError}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? "Saving..." : "Save Boat"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default AllBooking;
