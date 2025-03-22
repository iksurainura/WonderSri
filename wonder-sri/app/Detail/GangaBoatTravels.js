"use client";

import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Description from "./Description";

export default function MaduRiverGallery() {
  const galleryImages = [
    {
      src: "https://i0.wp.com/amazinglanka.com/wp/wp-content/uploads/2014/09/madu-01.jpg?resize=640%2C360&ssl=1",
      alt: "Group enjoying the boat safari",
      caption: "Group enjoying the scenic views",
    },
    {
      src: "https://media1.thrillophilia.com/filestore/go24ojqbn0qtf2f81jm3sowfuoc6_shutterstock_1274576008.jpg",
      alt: "Boats on the Madu River with lush greenery",
      caption: "Float, Explore, and Shop – Discover Treasures on the Madu River!",
    },
    {
      src: "https://www.hiru-ayurveda-resorts.com/wp-content/uploads/2017/09/madu_river.jpg",
      alt: "A boat speeding through the Madu River",
      caption: "A thrilling ride on the Madu River",
    },
    {
      src: "https://d2r2v0jxjsbm0p.cloudfront.net/2019/07/Untitled-design-79.png",
      alt: "Fish Therapy",
      caption: "Soothe Your Feet, Naturally – Let the Fish Work Their Magic!",
    },
  ];

  const [mainImage, setMainImage] = useState(galleryImages[0]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 py-12">
      <Head>
        <title>Madu River Boat Safari Balapitiya - Image Gallery</title>
        <meta
          name="description"
          content="Explore stunning images from the Madu River Boat Safari in Balapitiya, showcasing the beauty of the river and the exciting boat rides."
        />
      </Head>

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Madu River Boat Safari Panapitiya
          </h1>
          <p className="text-gray-600 mt-2">
            A collection of breathtaking moments from the Madu River Boat Safari
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-6">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-[400px] shadow-lg"
          />
          <p className="text-gray-600 text-center mt-2">{mainImage.caption}</p>
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setMainImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={200}
                height={150}
                className="rounded-lg object-cover w-full h-40 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-200 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <p className="text-black text-sm text-center px-2">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <Description />
      </div>
    </div>
  );
}