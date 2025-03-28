
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Common animation presets
export const animationPresets = {
  fadeIn: (element: HTMLElement | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: duration,
        delay: delay,
        ease: "power3.out"
      }
    );
  },
  
  fadeInRight: (element: HTMLElement | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: duration,
        delay: delay,
        ease: "power3.out"
      }
    );
  },
  
  fadeInLeft: (element: HTMLElement | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: duration,
        delay: delay,
        ease: "power3.out"
      }
    );
  },
  
  staggerChildren: (
    parent: HTMLElement | null,
    childSelector: string,
    fromVars: gsap.TweenVars = { y: 30, opacity: 0 },
    toVars: gsap.TweenVars = { y: 0, opacity: 1, duration: 0.5 },
    staggerAmount: number = 0.1
  ) => {
    if (!parent) return;
    
    const children = parent.querySelectorAll(childSelector);
    return gsap.fromTo(
      children,
      fromVars,
      {
        ...toVars,
        stagger: staggerAmount,
        ease: "power2.out"
      }
    );
  },
  
  createReveal: (
    element: HTMLElement | null, 
    start: string = "top 80%",
    end: string = "bottom 20%",
    scrub: boolean | number = false
  ) => {
    if (!element) return;
    
    return ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      scrub: scrub,
      markers: false,
      toggleClass: "active"
    });
  },
  
  parallax: (
    element: HTMLElement | null,
    intensity: number = 0.1,
    start: string = "top bottom",
    end: string = "bottom top"
  ) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { y: 0 },
      {
        y: () => -window.innerHeight * intensity,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: true
        }
      }
    );
  },
  
  floatingAnimation: (
    element: HTMLElement | null,
    yAmount: number = 15,
    duration: number = 2,
    rotationAmount: number = 1
  ) => {
    if (!element) return;
    
    return gsap.to(element, {
      y: yAmount,
      rotation: rotationAmount,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  },
  
  buttonHoverEffect: (button: HTMLElement) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.3 });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3 });
    });
    
    return () => {
      button.removeEventListener('mouseenter', () => {});
      button.removeEventListener('mouseleave', () => {});
    };
  },
  
  cleanupScrollTriggers: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
};

export default animationPresets;
