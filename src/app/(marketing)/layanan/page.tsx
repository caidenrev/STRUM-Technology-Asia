import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import LucideIcon from '@/components/ui/LucideIcon';
import { Card, CardContent } from '@/components/ui/card';

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10">
          Layanan Lengkap
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Solusi Kelistrikan & Energi Terbarukan
        </h1>
        <p className="text-strum-text-muted max-w-2xl text-base sm:text-lg">
          Kami menyediakan berbagai layanan instalasi, pemeliharaan, serta konsultasi kelistrikan berkualitas tinggi untuk residensial, bisnis, dan industri.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any) => (
          <Card
            key={service.id}
            className="bg-strum-dark-sec border-strum-dark-ter hover:border-strum-orange/40 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden shadow-xl"
          >
            {/* Service Thumbnail */}
            <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
              <img
                src={service.coverImage || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&h=300&q=80'}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-8 flex flex-col flex-grow gap-4">
              {/* Icon / Header */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange shrink-0">
                  <LucideIcon name={service.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-strum-text-muted leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Link CTA */}
              <Link
                href={`/layanan/${service.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-strum-orange hover:text-strum-orange-dark group"
              >
                Selengkapnya
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust banner */}
      <div className="bg-strum-dark-sec/30 border border-strum-dark-ter rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
        <div>
          <h3 className="text-lg font-bold text-white">Butuh Solusi Kelistrikan Khusus?</h3>
          <p className="text-sm text-strum-text-muted mt-1">Tim engineer kami siap merancang desain dan spesifikasi teknis sesuai kebutuhan unik proyek Anda.</p>
        </div>
        <Link href="/kontak">
          <button className="bg-strum-orange hover:bg-strum-orange-dark text-white font-semibold rounded-lg px-6 py-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-strum-orange/20 cursor-pointer">
            Hubungi Engineer Kami
          </button>
        </Link>
      </div>
    </div>
  );
}
