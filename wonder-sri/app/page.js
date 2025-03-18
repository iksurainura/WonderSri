import HeroSection from "./components/HeroSection";
import Vendor from "./components/Vendor";
import Guru from "./components/Guru";
import PopupNotification from "./components/PopupNotification";
import BoatCard from "./components/BoatCard";
import CustomCursor from "./CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <PopupNotification />
      <HeroSection />
      <BoatCard />
      <Vendor />
      <Guru />
    </>
  );
}
