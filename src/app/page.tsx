import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Gallery from "@/components/Gallery";
import SignatureFilm from "@/components/SignatureFilm";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0B0B0B]">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Gallery />
      <SignatureFilm />
      <About />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}

