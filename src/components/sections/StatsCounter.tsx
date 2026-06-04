'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Zap, Calendar, Users } from 'lucide-react';

interface StatsProps {
  projects: number;
  capacity: string;
  years: number;
  clients: number;
}

export default function StatsCounter({ projects, capacity, years, clients }: StatsProps) {
  const [counts, setCounts] = useState({
    projects: 0,
    years: 0,
    clients: 0,
  });
  
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate count values
          const duration = 2000; // 2 seconds
          const steps = 50;
          const stepTime = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCounts({
              projects: Math.floor((projects / steps) * step),
              years: Math.floor((years / steps) * step),
              clients: Math.floor((clients / steps) * step),
            });
            
            if (step >= steps) {
              clearInterval(timer);
              setCounts({
                projects,
                years,
                clients,
              });
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [projects, years, clients, hasAnimated]);

  const statItems = [
    {
      value: `${counts.projects}+`,
      label: 'Proyek Selesai',
      icon: <Trophy className="w-8 h-8 text-strum-orange" />,
    },
    {
      value: capacity,
      label: 'Kapasitas Terpasang',
      icon: <Zap className="w-8 h-8 text-strum-orange" />,
    },
    {
      value: `${counts.years}+ Tahun`,
      label: 'Pengalaman Industri',
      icon: <Calendar className="w-8 h-8 text-strum-orange" />,
    },
    {
      value: `${counts.clients}+`,
      label: 'Klien Puas',
      icon: <Users className="w-8 h-8 text-strum-orange" />,
    },
  ];

  return (
    <div
      ref={elementRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-6 bg-strum-dark-sec/50 border border-strum-dark-ter rounded-2xl backdrop-blur-sm"
    >
      {statItems.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center text-center p-4 group">
          <div className="w-16 h-16 rounded-2xl bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-strum-orange/20 duration-300">
            {item.icon}
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {item.value}
          </span>
          <span className="text-sm text-strum-text-muted mt-2 font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
