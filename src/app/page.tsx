import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Gallery from "@/components/Gallery";
import SignatureFilm from "@/components/SignatureFilm";
import InstagramReels from "@/components/InstagramReels";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import UpcomingEvent from "@/components/UpcomingEvent";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0B0B0B]">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <InstagramReels />
      <Gallery />
      <SignatureFilm />
      <About />
      <Testimonials />
      <UpcomingEvent
        name="Samriddhi"
        tagline="A Celebration of Prosperity & Grace"
        date={new Date("2025-12-15T00:00:00")}
        dateLabel="December 15, 2025"
        venue={null}
        bannerSrc={null}
        whatsappNumber="918818888899"
        whatsappMessage="Hi! I'd like to enquire about the Samriddhi event."
        sectionId="samriddhi"
      />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}

