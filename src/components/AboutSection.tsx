
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        }
      }
    );
    
    // Text paragraphs animation
    gsap.fromTo(
      textRef.current?.querySelectorAll('p'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.7,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      }
    );
    
    // Stats animation
    gsap.fromTo(
      statsRef.current?.querySelectorAll('.stat-item'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 75%",
        }
      }
    );
    
    // Image animation
    gsap.fromTo(
      imageRef.current,
      { 
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        opacity: 0.8
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Counter animation for stats
    const countElements = document.querySelectorAll('.stat-count');
    countElements.forEach(element => {
      const target = Number(element.getAttribute('data-target'));
      
      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          }
        }
      );
    });
    
    // Button animation
    gsap.fromTo(
      textRef.current?.querySelector('button'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: textRef.current?.querySelector('button'),
          start: "top 85%",
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
          <span className="relative z-10">About Our Dental Practice</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-dental-purple rounded-full"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Founded in 2005, our dental clinic has been providing exceptional dental care to patients of all ages. Our team of experienced dentists and dental hygienists are committed to delivering the highest quality treatment in a comfortable and relaxing environment.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              We utilize the latest dental technology and techniques to ensure precise diagnoses and effective treatments. Our patient-centered approach means we take the time to listen to your concerns and develop personalized treatment plans that address your unique needs.
            </p>
            
            <div ref={statsRef} className="grid grid-cols-3 gap-4 my-10">
              <div className="stat-item text-center p-4">
                <div className="stat-count text-4xl font-bold text-dental-purple" data-target="15">0</div>
                <div className="text-sm text-gray-600 mt-2">Years Experience</div>
              </div>
              <div className="stat-item text-center p-4">
                <div className="stat-count text-4xl font-bold text-dental-purple" data-target="5000">0</div>
                <div className="text-sm text-gray-600 mt-2">Happy Patients</div>
              </div>
              <div className="stat-item text-center p-4">
                <div className="stat-count text-4xl font-bold text-dental-purple" data-target="12">0</div>
                <div className="text-sm text-gray-600 mt-2">Expert Dentists</div>
              </div>
            </div>
            
            <Button className="bg-dental-purple hover:bg-dental-purple/90 text-white mt-6 transition-all duration-300 hover:scale-105">
              Learn More About Us
            </Button>
          </div>
          
          <div ref={imageRef} className="relative overflow-hidden rounded-xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80" 
              alt="Dental office" 
              className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/20 to-transparent mix-blend-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
