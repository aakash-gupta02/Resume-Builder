import BackgroundComponent from '@/components/LandingPage/BackgroundComponent';
import CTA from '@/components/LandingPage/CTA';
import FeaturesSection from '@/components/LandingPage/FeaturesSection';
import Footer from '@/components/LandingPage/Footer';
import HeroSection from '@/components/LandingPage/HeroSection';
import StatsSection from '@/components/LandingPage/StatsSection';

export default function Home() {

  return (
    <BackgroundComponent>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTA />
      <Footer />
    </BackgroundComponent>
  );
}