"use client";
import { useState } from "react";
import Upload from "./Upload";

export default function BoatTourDashboard() {
  const [tours, setTours] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTourSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTour = {
        id: Date.now(),
        name,
        capacity: parseInt(capacity),
        description,
        location,
        images: imagePreviews,
      };

      setTours([...tours, newTour]);
      setName("");
      setCapacity("");
      setDescription("");
      setLocation("");
      setImages([]);
      setImagePreviews([]);
      setError(null);
    } catch (err) {
      setError("Failed to add tour");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (newImages) => {
    const previews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setImages(newImages);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-black mb-6">
          Boat Tour Dashboard
        </h1>
        <form onSubmit={handleTourSubmit} className="space-y-6">
          <Upload
            images={images}
            setImages={setImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
            onImageChange={handleImageChange}
          />
          <div>
            <label
              htmlFor="tour-name"
              className="block text-sm font-medium text-black mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="tour-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter tour name (e.g., Madu River Safari)"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="tour-capacity"
              className="block text-sm font-medium text-black mb-1"
            >
              Capacity
            </label>
            <input
              type="number"
              id="tour-capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter capacity (e.g., 10)"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="tour-description"
              className="block text-sm font-medium text-black mb-1"
            >
              Description
            </label>
            <textarea
              id="tour-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter a description of the tour (e.g., A scenic boat ride through the Madu River mangroves)"
              rows={3}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="tour-location"
              className="block text-sm font-medium text-black mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="tour-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter location (e.g., Balapitiya, Sri Lanka)"
              required
              aria-required="true"
            />
          </div>
          {error && (
            <p
              className="text-red-500 text-center text-black"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Add Tour"}
          </button>
        </form>
      </div>
    </div>
  );
}
