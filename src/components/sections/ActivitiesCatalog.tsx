'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Activity {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: Date;
  location: string;
  client: string | null;
  thumbnail: string;
  description: string;
}

interface ActivitiesCatalogProps {
  initialActivities: Activity[];
}

const categories = [
  'Semua',
  'Proyek Pemasangan',
  'Workshop & Training',
  'Seminar & Pameran',
  'CSR & Sosial',
  'Factory Visit',
  'Sertifikasi',
];

export default function ActivitiesCatalog({ initialActivities }: ActivitiesCatalogProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Filter logic
  const filteredActivities = initialActivities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${activeCategory === cat
                ? 'bg-strum-orange border-strum-orange text-white shadow-lg shadow-strum-orange/25'
                : 'bg-strum-dark-sec border-strum-dark-ter text-strum-text-sec hover:border-strum-text-muted hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs order-1 md:order-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-strum-text-muted" />
          <Input
            type="text"
            placeholder="Cari judul, lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-strum-dark-sec border-strum-dark-ter text-white placeholder:text-strum-text-muted focus:border-strum-orange focus:ring-strum-orange w-full"
          />
        </div>
      </div>

      {/* Grid of Results */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-20 bg-strum-dark-sec/30 border border-strum-dark-ter rounded-2xl">
          <p className="text-strum-text-muted text-base">Tidak ada kegiatan yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-strum-dark-sec border border-strum-dark-ter rounded-2xl overflow-hidden hover:border-strum-orange/30 transition-all duration-300 flex flex-col shadow-xl"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
                <img
                  src={activity.thumbnail || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&h=300&q=80'}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge overlay */}
                <div className="absolute top-4 left-4 bg-strum-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {activity.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex items-center justify-between text-xs text-strum-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-strum-orange" />
                    {new Date(activity.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-strum-orange" />
                    {activity.location}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-strum-orange transition-colors line-clamp-2">
                  {activity.title}
                </h3>

                <p className="text-xs text-strum-text-muted line-clamp-3 leading-relaxed">
                  {activity.description}
                </p>

                <Link
                  href={`/kegiatan/${activity.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-strum-orange hover:text-strum-orange-dark group/link"
                >
                  Detail Proyek
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
