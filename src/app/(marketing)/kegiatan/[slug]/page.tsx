import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, User, Zap, Users } from 'lucide-react';
import { db } from '@/lib/db';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const activity = await db.activity.findUnique({
    where: { slug },
  });

  if (!activity || !activity.isPublished) {
    notFound();
  }

  // Parse gallery safely
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(activity.gallery);
  } catch (e) {}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col gap-10 text-white">
      {/* Back button */}
      <div>
        <Link
          href="/kegiatan"
          className="inline-flex items-center gap-2 text-sm text-strum-text-muted hover:text-strum-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Semua Kegiatan
        </Link>
      </div>

      {/* Meta Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <span className="bg-strum-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {activity.category}
          </span>
          <span className="bg-strum-dark-sec border border-strum-dark-ter text-strum-text-muted text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-strum-orange" />
            {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="bg-strum-dark-sec border border-strum-dark-ter text-strum-text-muted text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-strum-orange" />
            {activity.location}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          {activity.title}
        </h1>
      </div>

      {/* Main Cover Image */}
      <div className="relative h-[450px] w-full rounded-2xl overflow-hidden border border-strum-dark-ter shadow-xl bg-zinc-900">
        <img
          src={activity.thumbnail || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&h=630&q=80'}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Grid & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Description (2 columns) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b border-strum-dark-ter pb-2 text-strum-orange">
              Detail Kegiatan
            </h2>
            <div className="text-strum-text-sec leading-relaxed text-base whitespace-pre-line">
              {activity.description}
            </div>
          </div>

          {/* Project Gallery */}
          {gallery.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold border-b border-strum-dark-ter pb-2 text-strum-orange">
                Dokumentasi Tambahan
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative h-44 rounded-xl overflow-hidden border border-strum-dark-ter bg-zinc-900 group"
                  >
                    <img
                      src={url}
                      alt={`Dokumentasi ${activity.title} - ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info (1 column) */}
        <div className="flex flex-col gap-6">
          <div className="bg-strum-dark-sec border border-strum-dark-ter rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
            <h3 className="text-lg font-bold border-b border-strum-dark-ter pb-2">Info Proyek</h3>
            
            {activity.client && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-strum-orange shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-strum-text-muted">Klien / Instansi</span>
                  <span className="text-sm font-semibold text-white">{activity.client}</span>
                </div>
              </div>
            )}

            {activity.capacity && (
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-strum-orange shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-strum-text-muted">Kapasitas Terpasang</span>
                  <span className="text-sm font-semibold text-white">{activity.capacity}</span>
                </div>
              </div>
            )}

            {activity.participants && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-strum-orange shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-strum-text-muted">Peserta Terlibat</span>
                  <span className="text-sm font-semibold text-white">{activity.participants} Orang</span>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-strum-dark-ter">
              <Link href="/kontak" className="w-full">
                <button className="w-full bg-strum-orange hover:bg-strum-orange-dark text-white font-semibold rounded-lg py-2.5 transition-all text-xs">
                  Hubungi Mengenai Proyek Ini
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
