import Image from "next/image";
import HeroSection from "./components/HeroSection";
import PopupNotification from "./components/PopupNotification";

export default function Home() {
  return (
<>
<PopupNotification/>
<HeroSection/>
</>
  );
}
