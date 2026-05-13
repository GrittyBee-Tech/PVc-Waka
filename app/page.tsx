import LandingPage from "@/components/landing-page/home";
import Objective from "@/components/landing-page/objective";
import Navbar from "@/components/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#10200e]">
      <Navbar />
      <LandingPage />
      <Objective />
    </div>
  );
}
