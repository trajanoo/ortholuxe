import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import BookConsultationSection from './components/sections/BookConsultationSection';
import Footer from './components/sections/Footer';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';

export default function Home() {
 
  return (
    <div className="relative w-full overflow-x-hidden bg-white"> 
      <HeroSection />
      <ServicesSection />
      <BookConsultationSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
