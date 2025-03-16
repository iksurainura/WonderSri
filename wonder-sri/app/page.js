import HeroSection from "./components/HeroSection";
import Vendor from "./components/Vendor";
import Guru from "./components/Guru";
import PopupNotification from "./components/PopupNotification";
import BoatCard from "./components/BoatCard";

export default function Home() {
  return (
    <>
      <PopupNotification />
      <HeroSection />
      <BoatCard />
      <Vendor />
      <Guru />
    </>
  );
}
