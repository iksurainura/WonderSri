"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./card";
import { Video, Gift, Wrench, Users, Calendar } from "lucide-react";

function Featureshow() {
  const [language, setLanguage] = useState("sinhala"); // Default language is Sinhala
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Sinhala content
  const sinhalaContent = {
    heroTitle: "Wonder Sri",
    heroSubtitle: "අපෙන් ඔබට ලැබෙන ප්‍රතිලාභ සහ සේවා",
    features: [
      {
        title: "සමාජ මාධ්‍ය ප්‍රවර්ධනය",
        description:
          "ඔබේ ව්‍යාපාරය ප්‍රවර්ධනය කිරීමට YouTube, Facebook, සහ TikTok හි මාසික වීඩියෝ 1-3ක් නිෂ්පාදනය කරමු. ආකර්ෂණීය අන්තර්ගතයක් සමඟ ඔබේ ප්‍රේක්ෂකයින් වැඩි කර ගන්න.",
        icon: <Video className="h-8 w-8 text-blue-600" />,
        image: "https://assets-static.invideo.io/images/large/7_1eca727678.png",
      },
      {
        title: "මාස 3 නොමිලේ",
        description:
          "පළමු මාස 3 සඳහා සම්පූර්ණයෙන්ම නොමිලේ සේවාවන් ලබා දෙන්නෙමු. ඔබේ ව්‍යාපාරය ස්ථාපිත වන තුරු අපි ඔබ සමඟ සිටිමු, අමතර ගාස්තු නැතිව.",
        icon: <Gift className="h-8 w-8 text-blue-600" />,
        image: "/VendorService.png",
      },
      {
        title: "තාක්ෂණික මගපෙන්වීම",
        description:
          "24/7 ඩිජිටල් උපකරණ සහ මෙවලම් භාවිතය පිළිබඳ විශේෂඥ මග පෙන්වීම. ඔබේ තාක්ෂණික ගැටලු විසඳීමට අපගේ කණ්ඩායම සූදානම්.",
        icon: <Wrench className="h-8 w-8 text-blue-600" />,
        image: "/it.png",
      },
      {
        title: "පාරිභෝගික සම්බන්ධතා",
        description:
          "ඔබේ පාරිභෝගිකයින් සමඟ සම්බන්ධතා ගොඩනඟා ගැනීමට සහ ඔවුන්ගේ ගැටලු විසඳීමට උපකාරී වන පද්ධති සහ සහයෝගය.",
        icon: <Users className="h-8 w-8 text-blue-600" />,
        image: "https://www.givainc.com/images/friendly_customer_service.png",
      },
      {
        title: "වෙන් කිරීම් කළමනාකරණය",
        description:
          "ඔබේ වෙන් කිරීම් සඳහා ඩිජිටල් වේදිකාවක් සපයමු, එමඟින් ඔබේ ව්‍යාපාරය කාර්යක්ෂමව කළමනාකරණය කළ හැකිය.",
        icon: <Calendar className="h-8 w-8 text-blue-600" />,
        image:
          "https://www.bookitlive.net/content/wp-content/uploads/2021/03/How-does-booking-system-work.jpg",
      },
    ],
  };

  // English content
  const englishContent = {
    heroTitle: "Wonder Sri",
    heroSubtitle: "Benefits and Services We Offer",
    features: [
      {
        title: "Social Media Promotion",
        description:
          "We produce 1-3 monthly videos on YouTube, Facebook, and TikTok to promote your business. Attract more customers with engaging content.",
        icon: <Video className="h-8 w-8 text-blue-600" />,
        image: "https://assets-static.invideo.io/images/large/7_1eca727678.png",
      },
      {
        title: "3 Months Free",
        description:
          "We offer completely free services for the first 3 months. We’ll support you until your business is established, with no extra charges.",
        icon: <Gift className="h-8 w-8 text-blue-600" />,
        image: "/VendorService.png",
      },
      {
        title: "Technical Guidance",
        description:
          "Get expert guidance on using digital tools and equipment 24/7. Our team is ready to solve your technical issues.",
        icon: <Wrench className="h-8 w-8 text-blue-600" />,
        image: "/it.png",
      },
      {
        title: "Customer Relations",
        description:
          "Build strong relationships with your customers and resolve their issues with our support systems.",
        icon: <Users className="h-8 w-8 text-blue-600" />,
        image: "https://www.givainc.com/images/friendly_customer_service.png",
      },
      {
        title: "Booking Management",
        description:
          "We provide a digital platform for managing your bookings, helping you run your business efficiently.",
        icon: <Calendar className="h-8 w-8 text-blue-600" />,
        image:
          "https://www.bookitlive.net/content/wp-content/uploads/2021/03/How-does-booking-system-work.jpg",
      },
    ],
  };

  // Select content based on language
  const content = language === "sinhala" ? sinhalaContent : englishContent;

  return (
    <div className="bg-blue-500 w-full pt-16" ref={ref}>
      {/* Language Toggle Button */}
      <div className="flex justify-end max-w-6xl mx-auto px-4 md:px-8">
        <button
          onClick={() =>
            setLanguage(language === "sinhala" ? "english" : "sinhala")
          }
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full hover:bg-blue-50 transition-all text-sm"
        >
          {language === "sinhala" ? "English" : "සිංහල"}
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          className="relative z-10 text-center"
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 playwrite-it-moderna">
            {content.heroTitle}
          </h2>
          <h2 className="text-5xl font-bold text-center text-white mb-8">
            {content.heroSubtitle}
          </h2>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-10 px-4 bg-blue-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {content.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-xs rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="h-36 w-full object-cover"
                />
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featureshow;
