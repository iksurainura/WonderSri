
import "./globals.css";
import Navbar from "./components/Navbar";
import { Geist, Geist_Mono, Playwrite_IT_Moderna } from "next/font/google"
// Importing custom fonts from Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playwrite = Playwrite_IT_Moderna({
  variable: "--font-playwrite",
  subsets: ["latin"],
  weight: ["400"], // Adjust weight as needed (100, 200, 300, 400 available)
});

export const metadata = {
  title: "WonderSri",
  description: "",
  icons: {
    icon: "/Logo.png", // Path to your favicon in the public directory
  },
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+IT+Moderna:wght@100..400&display=swap" rel="stylesheet" />
  </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <div style={{ flex: 1, paddingTop: "80px" }}>{children}</div> {/* Add padding-top to avoid overlap */}
      </body>
    </html>
  );
}
