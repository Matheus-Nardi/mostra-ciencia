
import Hero from "@/components/project/Hero";
import Countdown from "@/components/project/Countdown";
import AboutEvent from "@/components/project/About";
import Schedule from "@/components/project/Schedule";
import Partners from "@/components/project/Partners";
import Faq from "@/components/project/Faq";
import Location from "@/components/project/Location";
import Subscription from "@/components/project/Subscription";
import News from "@/components/project/News";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutEvent />
      <Schedule />
      <Partners />
      <News />
      <Faq />
      <Location />
    </>
  );
}