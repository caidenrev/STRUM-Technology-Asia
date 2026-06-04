'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string | null;
  rating: number;
  content: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Testimonial card container with transition - updated to crisp white background */}
      <div className="relative w-full overflow-hidden min-h-[250px] bg-white border border-zinc-200/80 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col justify-center">
        {testimonials.map((item, idx) => (
          <div
            key={item.id}
            className={`transition-all duration-700 ease-in-out absolute inset-0 p-8 md:p-12 flex flex-col justify-center ${
              idx === activeIndex
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200 fill-zinc-100'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg md:text-xl text-zinc-800 italic font-medium mb-6">
              &ldquo;{item.content}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 rounded-full bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center font-bold text-strum-orange text-lg">
                {item.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-zinc-900 text-base">{item.name}</span>
                <span className="text-xs text-zinc-500 font-medium">
                  {item.position} {item.company ? `— ${item.company}` : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mt-6">
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'bg-strum-orange w-6' : 'bg-strum-dark-ter hover:bg-strum-text-muted'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-lg bg-strum-dark-sec border border-strum-dark-ter flex items-center justify-center text-white hover:bg-strum-orange hover:border-strum-orange transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-lg bg-strum-dark-sec border border-strum-dark-ter flex items-center justify-center text-white hover:bg-strum-orange hover:border-strum-orange transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
