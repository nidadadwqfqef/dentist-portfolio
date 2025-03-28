
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import gsap from 'gsap';

const Appointment = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    // Page transition animation
    const pageTransition = gsap.timeline();
    pageTransition.fromTo(
      ".content", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }
    );
    
    // Form elements animation
    const formElements = formRef.current?.querySelectorAll('input, textarea, select, button');
    pageTransition.fromTo(
      formElements,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      "-=0.4"
    );
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="content pt-32 pb-20">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="relative z-10">Book an Appointment</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-dental-purple rounded-full"></span>
          </h1>
          
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <form ref={formRef} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input id="firstName" placeholder="Your first name" className="w-full" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input id="lastName" placeholder="Your last name" className="w-full" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" className="w-full" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input id="phone" placeholder="(123) 456-7890" className="w-full" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <Input id="date" type="date" className="w-full" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select id="time" className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dental-purple focus:border-dental-purple">
                    <option value="">Select a time</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM - 5:00 PM)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                <select id="service" className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dental-purple focus:border-dental-purple">
                  <option value="">Select a service</option>
                  <option value="general">General Checkup</option>
                  <option value="cleaning">Teeth Cleaning</option>
                  <option value="whitening">Teeth Whitening</option>
                  <option value="orthodontics">Orthodontics Consultation</option>
                  <option value="implants">Implant Consultation</option>
                  <option value="emergency">Emergency Care</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <Textarea id="notes" placeholder="Is there anything else we should know?" className="w-full min-h-[100px]" />
              </div>
              
              <Button type="submit" className="w-full bg-dental-purple hover:bg-dental-purple/90 text-white transition-all duration-300 hover:scale-105">
                Book Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointment;
