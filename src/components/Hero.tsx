
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const floatingItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial animation
    tl.fromTo(
      textContentRef.current?.querySelector('h1'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
    
    tl.fromTo(
      textContentRef.current?.querySelector('p'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    );
    
    tl.fromTo(
      textContentRef.current?.querySelector('.button-group'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.7"
    );
    
    // Image reveal with mask
    tl.fromTo(
      imageContainerRef.current,
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2 },
      "-=1"
    );
    
    // Floating elements
    gsap.fromTo(
      floatingItemsRef.current?.children,
      { 
        y: 40, 
        opacity: 0, 
        scale: 0.9,
        rotation: -5
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        stagger: 0.15, 
        duration: 0.8,
        delay: 1.5
      }
    );
    
    // Continuous floating animation
    gsap.to(
      floatingItemsRef.current?.children,
      {
        y: "-=10",
        rotation: "+=2",
        duration: 2,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          repeat: -1,
          yoyo: true
        }
      }
    );
    
    // Button hover animations
    const buttons = textContentRef.current?.querySelectorAll('button');
    buttons?.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3 });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    });
    
    return () => {
      buttons?.forEach(button => {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dental-soft-purple/40 via-white to-dental-soft-blue/30 -z-10"></div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center py-16">
        <div ref={textContentRef} className="z-10 pr-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Your Perfect Smile <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-dental-purple to-dental-blue">
              Starts Here
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Experience exceptional dental care with our team of specialists dedicated to providing you with a comfortable and personalized treatment.
          </p>
          
          <div className="button-group mt-10 flex flex-wrap gap-4">
            <Button className="bg-dental-purple hover:bg-dental-purple/90 text-white px-8 py-6 transition-all">
              Book a Consultation
            </Button>
            <Button variant="outline" className="border-dental-purple text-dental-purple hover:bg-dental-soft-purple/20 px-8 py-6 transition-all">
              Explore Services
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div ref={imageContainerRef} className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              alt="Dentist with patient" 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/30 to-transparent"></div>
          </div>
          
          {/* Floating elements */}
          <div ref={floatingItemsRef} className="absolute -top-8 -left-8 z-20">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4 max-w-[180px]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dental-soft-purple flex items-center justify-center">
                  <svg className="w-5 h-5 text-dental-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Perfect Care</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-5 -right-5 z-20">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dental-soft-peach flex items-center justify-center">
                  <svg className="w-5 h-5 text-dental-purple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">5000+ Happy Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
