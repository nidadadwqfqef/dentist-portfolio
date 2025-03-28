
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Jennifer Thompson",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    content: "I've been a patient at DentCare for over 5 years, and I can't imagine going anywhere else. Dr. Johnson and his team provide exceptional care with a gentle touch. My smile has never looked better!"
  },
  {
    name: "Michael Roberts",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "After years of dental anxiety, I finally found a clinic where I feel completely at ease. The staff is incredibly patient and understanding, and the modern technology they use makes everything quick and painless."
  },
  {
    name: "Sarah Garcia",
    role: "Teacher",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "The entire team at DentCare is amazing! From the front desk to the dental hygienists to Dr. Martinez - everyone is professional, friendly, and focused on patient comfort. My family and I are patients for life."
  },
  {
    name: "David Chen",
    role: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    content: "I needed extensive cosmetic work and was nervous about the results. Dr. Smith walked me through every step and showed me digital previews of how my smile would look. The final result exceeded my expectations!"
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    
    // Initial testimonial cards animation
    gsap.fromTo(
      ".testimonial-card",
      { 
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Set up automatic carousel
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(interval);
    };
  }, []);
  
  // Animate card transitions when activeIndex changes
  useEffect(() => {
    const cards = document.querySelectorAll('.testimonial-card');
    
    gsap.to(cards, {
      opacity: 0.3,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(cards[activeIndex], {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
  }, [activeIndex]);

  return (
    <div ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
          <span className="relative z-10">What Our Patients Say</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-dental-purple rounded-full"></span>
        </h2>
        
        <div ref={cardsRef} className="relative">
          <div className="mx-auto max-w-3xl">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`testimonial-card absolute inset-0 bg-white p-8 rounded-xl shadow-lg transition-all duration-500 ${
                  index === activeIndex ? "z-10 opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dental-purple">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <svg className="absolute -top-10 -left-10 w-20 h-20 text-dental-soft-purple opacity-30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                    <p className="text-gray-700 text-lg leading-relaxed z-10 relative">{testimonial.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center mt-[400px] space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-dental-purple scale-125" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
