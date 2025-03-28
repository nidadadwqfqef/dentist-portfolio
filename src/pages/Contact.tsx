
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import gsap from 'gsap';

const Contact = () => {
  useEffect(() => {
    // Page transition animation
    const pageTransition = gsap.timeline();
    pageTransition.fromTo(
      ".content", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="content pt-32 pb-0">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="relative z-10">Contact Us</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-dental-purple rounded-full"></span>
          </h1>
        </div>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
