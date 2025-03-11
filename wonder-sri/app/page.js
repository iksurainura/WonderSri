import HeroSection from "./components/HeroSection";
import Vendor from "./components/Vendor";
import Guru from "./components/Guru";
import PopupNotification from "./components/PopupNotification";
export default function Home() {
  return (
    <>
    <PopupNotification/>
      <HeroSection />
      <Vendor />
      <Guru />
    </>
  );
}
