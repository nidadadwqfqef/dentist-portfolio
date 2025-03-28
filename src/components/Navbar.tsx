
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Navbar = () => {
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );
    
    tl.fromTo(
      linksRef.current?.children,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      "-=0.5"
    );

    // Subtle hover effect for nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { y: -2, duration: 0.3, ease: "power2.out" });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    return () => {
      navItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div ref={navbarRef} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div ref={logoRef} className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-dental-purple rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-xl font-semibold text-dental-purple">DentCare</span>
        </div>
        
        <div ref={linksRef} className="flex space-x-8">
          <button onClick={() => navigateTo("/")} className="nav-item text-gray-600 hover:text-dental-purple transition-colors">Home</button>
          <button onClick={() => navigateTo("/about")} className="nav-item text-gray-600 hover:text-dental-purple transition-colors">About</button>
          <button onClick={() => navigateTo("/services")} className="nav-item text-gray-600 hover:text-dental-purple transition-colors">Services</button>
          <button onClick={() => navigateTo("/gallery")} className="nav-item text-gray-600 hover:text-dental-purple transition-colors">Gallery</button>
          <button onClick={() => navigateTo("/contact")} className="nav-item text-gray-600 hover:text-dental-purple transition-colors">Contact</button>
        </div>
        
        <Button onClick={() => navigateTo("/appointment")} className="bg-dental-purple hover:bg-dental-purple/90 text-white px-6 transition-all duration-300 hover:scale-105">
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
