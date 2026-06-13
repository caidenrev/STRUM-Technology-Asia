import React from 'react';
import { db } from '@/lib/db';
import ActivitiesCatalog from '@/components/sections/ActivitiesCatalog';

export default async function ActivitiesPage() {
  const activities = await db.activity.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col gap-12">
      {/* Header */}
      <div className="text-left flex flex-col gap-4 max-w-3xl">
        <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10 w-fit">
          Dokumentasi & Portofolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Aktivitas, Kegiatan, & Proyek Perusahaan
        </h1>
        <p className="text-strum-text-muted text-base sm:text-lg leading-relaxed">
          Lihat rekam jejak pekerjaan pemasangan panel surya, program workshop edukatif, seminar industri, serta kontribusi sosial kami di seluruh Indonesia.
        </p>
      </div>

      {/* Catalog Grid */}
      <ActivitiesCatalog initialActivities={activities} />
    </div>
  );
}

