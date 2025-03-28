
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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
    
    // Form elements animation
    gsap.fromTo(
      formRef.current?.querySelectorAll('input, textarea, button'),
      { 
        y: 20, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Contact info items animation
    gsap.fromTo(
      infoRef.current?.querySelectorAll('.info-item'),
      { 
        x: 30, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Form input focus animations
    const inputs = formRef.current?.querySelectorAll('input, textarea');
    inputs?.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, { 
          scale: 1.02,
          boxShadow: "0 0 0 2px rgba(155, 135, 245, 0.3)",
          duration: 0.3
        });
      });
      
      input.addEventListener('blur', () => {
        gsap.to(input, { 
          scale: 1,
          boxShadow: "none",
          duration: 0.3
        });
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      inputs?.forEach(input => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-24 bg-dental-soft-purple/30">
      <div className="container mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
          <span className="relative z-10">Contact Us</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-dental-purple rounded-full"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <form ref={formRef} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input id="firstName" placeholder="John" className="w-full" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input id="lastName" placeholder="Doe" className="w-full" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input id="email" type="email" placeholder="johndoe@example.com" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Input id="phone" placeholder="(123) 456-7890" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea id="message" placeholder="Tell us about your dental needs..." className="w-full min-h-[120px]" />
              </div>
              
              <Button type="submit" className="w-full bg-dental-purple hover:bg-dental-purple/90 text-white transition-all duration-300 hover:scale-105">
                Send Message
              </Button>
            </form>
          </div>
          
          <div ref={infoRef} className="flex flex-col justify-center">
            <div className="info-item flex items-start mb-8">
              <div className="bg-dental-purple/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-dental-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Location</h4>
                <p className="text-gray-600">123 Dental Street, Suite 101<br />New York, NY 10001</p>
              </div>
            </div>
            
            <div className="info-item flex items-start mb-8">
              <div className="bg-dental-purple/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-dental-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Phone</h4>
                <p className="text-gray-600">(123) 456-7890</p>
                <p className="text-gray-600">Emergency: (123) 456-7899</p>
              </div>
            </div>
            
            <div className="info-item flex items-start mb-8">
              <div className="bg-dental-purple/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-dental-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Email</h4>
                <p className="text-gray-600">info@dentcare.com</p>
                <p className="text-gray-600">appointments@dentcare.com</p>
              </div>
            </div>
            
            <div className="info-item flex items-start">
              <div className="bg-dental-purple/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-dental-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Office Hours</h4>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
