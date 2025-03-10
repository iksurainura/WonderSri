import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";


// Importing custom fonts from Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        
        <Navbar />
        <div style={{ flex: 1, paddingTop: "80px" }}>{children}</div> {/* Add padding-top to avoid overlap */}
        
      </body>
    </html>
  );
}
