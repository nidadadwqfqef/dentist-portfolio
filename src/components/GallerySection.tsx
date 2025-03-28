
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Modern dental clinic reception",
    category: "Clinic"
  },
  {
    src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Dental treatment room",
    category: "Facilities"
  },
  {
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Patient getting dental checkup",
    category: "Treatments"
  },
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    alt: "Dentist with happy patient",
    category: "Team"
  },
  {
    src: "https://images.unsplash.com/photo-1571772996211-2f02974a9f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Modern dental equipment",
    category: "Technology"
  },
  {
    src: "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Beautiful smile after treatment",
    category: "Results"
  }
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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
    
    // Gallery images staggered animation
    gsap.fromTo(
      galleryRef.current?.querySelectorAll('.gallery-item'),
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Hover animations for gallery items
    const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item');
    galleryItems?.forEach(item => {
      const image = item.querySelector('img');
      const overlay = item.querySelector('.overlay');
      
      item.addEventListener('mouseenter', () => {
        gsap.to(image, { 
          scale: 1.1, 
          duration: 0.5 
        });
        gsap.to(overlay, { 
          opacity: 1, 
          duration: 0.3 
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(image, { 
          scale: 1, 
          duration: 0.5 
        });
        gsap.to(overlay, { 
          opacity: 0, 
          duration: 0.3 
        });
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      galleryItems?.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
          <span className="relative z-10">Our Gallery</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-dental-purple rounded-full"></span>
        </h2>
        
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-72">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="overlay absolute inset-0 bg-dental-purple/70 opacity-0 transition-opacity flex flex-col justify-center items-center text-white p-6">
                <h3 className="text-xl font-semibold mb-2">{image.category}</h3>
                <p className="text-center">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
