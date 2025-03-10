import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense } from "react";
export default function Home() {
  return (
<>
<Suspense fallback={<LoadingScreen />}>
<HeroSection/>
</Suspense>

</>
  );
}
