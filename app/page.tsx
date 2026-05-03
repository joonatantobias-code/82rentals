import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import SocialFeed from "@/components/SocialFeed";
import Reviews from "@/components/Reviews";
import Lifestyle from "@/components/Lifestyle";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <SocialFeed />
      <Reviews />
      <Lifestyle />
      <CTABanner />
    </>
  );
}
