import { Geist, Geist_Mono,Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

// Importing custom fonts from Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const sinhalaFont = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '700'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main content with padding to avoid overlap with the fixed Navbar */}
        <div style={{ flex: 1, paddingTop: "80px" }}>{children}</div>
      </body>
    </html>
  );
}