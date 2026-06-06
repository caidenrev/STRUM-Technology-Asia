import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ArrowUpRight, Zap } from 'lucide-react';
import { db } from '@/lib/db';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import LucideIcon from '@/components/ui/LucideIcon';
import { Button } from '@/components/ui/button';
import ScrollAnimate from '@/components/ui/ScrollAnimate';

export default async function HomePage() {
  // Query all database data in parallel
  const [settings, services, activities, testimonials] = await Promise.all([
    db.globalSetting.findFirst(),
    db.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, take: 6 }),
    db.activity.findMany({ where: { isPublished: true, isFeatured: true }, take: 3, orderBy: { date: 'desc' } }),
    db.testimonial.findMany({ where: { isActive: true }, take: 5 }),
  ]);

  // Fallback defaults if table is empty (though seeded)
  const companyName = settings?.companyName || 'Strum Technology Asia';
  const tagline = settings?.tagline || 'Powering a Brighter Future';
  const heroTitle = settings?.heroTitle || 'Solusi Kelistrikan & Energi Terbarukan Terpercaya';
  const heroSubtitle = settings?.heroSubtitle || 'Kami menyediakan layanan instalasi panel surya PLTS, kelistrikan gedung, CCTV, dan backup power berkualitas tinggi untuk efisiensi energi Anda.';

  const stats = {
    projects: settings?.statsProjects ?? 150,
    capacity: settings?.statsCapacity || '2.5 MWp',
    years: settings?.statsYears ?? 10,
    clients: settings?.statsClients ?? 200,
  };

  const whyChooseUs = [
    'Berpengalaman lebih dari 10 tahun di industri kelistrikan.',
    'Tim teknisi bersertifikasi resmi ESDM dan BNSP.',
    'Produk panel surya Tier-1 dengan garansi panjang hingga 25 tahun.',
    'Sistem monitoring real-time berbasis aplikasi smartphone.',
    'Layanan purna jual (maintenance) yang andal dan responsif.',
    'Instalasi aman sesuai standar PUIL Indonesia.',
  ];

  const partners = [
    'PT Karawang Tekstil Utama', 'PT Surya Energi Indonesia', 'PT Modul Utama',
    'Yayasan Bina Insani', 'PLN Nusantara Power', 'Kementerian ESDM',
    'ICE BSD Tangerang', 'PT Listrik Nasional'
  ];

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Full-width blurred background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80"
            alt="Solar facility background"
            fill
            className="object-cover blur-[3px] scale-105"
            priority
          />
          {/* Deep dark blue-black gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-strum-dark/95 via-strum-dark/85 to-strum-dark/65" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column (Content) - spans 7 columnls */}
          <ScrollAnimate className="lg:col-span-7 flex flex-col items-start text-left gap-6" direction="right" duration={0.8}>
            {/* Badge pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-strum-orange/20 border border-strum-orange/30 text-strum-orange text-xs font-bold uppercase tracking-wider">
              {tagline}
            </div>

            {/* Headline - extremely thick, sans-serif like the reference */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              {heroTitle.split(' ').map((word: string, index: number) =>
                word.toLowerCase().includes('energi') || word.toLowerCase().includes('terpercaya') ? (
                  <span key={index} className="text-strum-orange font-black">{word} </span>
                ) : `${word} `
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-strum-text-sec leading-relaxed max-w-xl">
              {heroSubtitle}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <Link href="/layanan" className="w-full sm:w-auto">
                <Button className="w-full bg-strum-orange hover:bg-strum-orange-dark text-white font-extrabold rounded-xl px-8 py-6 text-sm tracking-wide transition-all hover:scale-105 border-none shadow-lg shadow-strum-orange/30 cursor-pointer">
                  Lihat Layanan Kami
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/kegiatan" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-extrabold rounded-xl px-8 py-6 text-sm tracking-wide transition-all hover:scale-105 cursor-pointer">
                  Portofolio Proyek
                </Button>
              </Link>
            </div>
          </ScrollAnimate>

          {/* Right Column (Company Image Card) - spans 5 columns */}
          <ScrollAnimate className="lg:col-span-5 w-full flex justify-center lg:justify-end" direction="left" duration={0.8} delay={0.25}>
            <div className="relative w-full max-w-[450px] h-[320px] sm:h-[400px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
              {/* Soft overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-strum-orange/10 to-transparent pointer-events-none z-10" />
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&h=600&q=80"
                alt="Strum Technology Asia Company Solar Panel installation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Floating info badge */}
              <div className="absolute bottom-6 right-6 z-20 bg-strum-dark/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-0.5 shadow-xl">
                <span className="text-[10px] font-bold text-strum-orange uppercase tracking-wider leading-none mb-1">Kapasitas PLTS</span>
                <span className="text-xl font-extrabold text-white leading-none">2.5 MWp+</span>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-12">
        <ScrollAnimate className="text-center flex flex-col items-center gap-4" direction="up">
          <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Solusi Kelistrikan & Energi Terintegrasi
          </h2>
          <p className="text-strum-text-muted max-w-2xl text-base">
            Kami menghadirkan layanan profesional untuk mendukung efisiensi energi bangunan residensial, bisnis, hingga industri manufaktur Anda.
          </p>
        </ScrollAnimate>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, idx: number) => (
            <ScrollAnimate key={service.id} direction="up" delay={idx * 0.1} duration={0.5}>
              <div
                className="group bg-strum-dark-sec border border-strum-dark-ter rounded-2xl p-8 hover:border-strum-orange/40 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-6 shadow-xl h-full"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange transition-colors group-hover:bg-strum-orange group-hover:text-white">
                  <LucideIcon name={service.icon} className="w-6 h-6" />
                </div>

                {/* Title & Desc */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-strum-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-strum-text-muted leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Action Link */}
                <Link
                  href={`/layanan/${service.slug}`}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-strum-orange hover:text-strum-orange-dark group/link"
                >
                  Selengkapnya
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-strum-dark-sec/30 border-y border-strum-dark-ter py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Card */}
          <ScrollAnimate direction="right" duration={0.8} className="w-full">
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden border border-strum-dark-ter shadow-2xl bg-zinc-900 group">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&h=600&q=80"
                alt="Instalasi Panel Surya Strum"
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-strum-dark via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-strum-dark/80 backdrop-blur-md rounded-xl border border-strum-dark-ter flex flex-col gap-2">
                <span className="text-xs font-bold text-strum-orange uppercase tracking-wider">Komitmen Keamanan</span>
                <p className="text-sm font-semibold text-white">Seluruh instalasi kami dirancang memenuhi standar operasional keselamatan tinggi demi keandalan jangka panjang.</p>
              </div>
            </div>
          </ScrollAnimate>

          {/* Right: Text & Check list */}
          <ScrollAnimate direction="left" duration={0.8} delay={0.25} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10 w-fit">
                Mengapa Memilih Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Mitra Kelistrikan dan Solar Panel Terbaik Anda
              </h2>
              <p className="text-strum-text-muted">
                Strum Technology Asia berkomitmen menghadirkan instalasi listrik dan PLTS berkualitas prima dengan mengedepankan keamanan, efisiensi, dan nilai investasi jangka panjang.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-strum-orange shrink-0 mt-0.5" />
                  <span className="text-sm text-strum-text-sec font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* 5. FEATURED ACTIVITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-12">
        <ScrollAnimate className="flex flex-col md:flex-row md:items-end justify-between gap-6" direction="up" duration={0.6}>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10 w-fit">
              Kegiatan Terkini
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Aktivitas & Portofolio Proyek Terbaru
            </h2>
          </div>
          <Link href="/kegiatan">
            <Button variant="outline" className="border-strum-dark-ter hover:bg-white/5 text-white font-semibold">
              Lihat Semua Kegiatan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </ScrollAnimate>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity: any, idx: number) => (
            <ScrollAnimate key={activity.id} direction="up" delay={idx * 0.1} duration={0.5}>
              <div
                className="group bg-strum-dark-sec border border-strum-dark-ter rounded-2xl overflow-hidden hover:border-strum-orange/30 transition-all duration-300 flex flex-col shadow-xl h-full"
              >
                {/* Image Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={activity.thumbnail || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&h=300&q=80'}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 bg-strum-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {activity.category}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <div className="flex items-center justify-between text-xs text-strum-text-muted">
                    <span>{new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>{activity.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-strum-orange transition-colors line-clamp-2">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-strum-text-muted line-clamp-3">
                    {activity.description}
                  </p>
                  {/* Read more */}
                  <Link
                    href={`/kegiatan/${activity.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-strum-orange hover:text-strum-orange-dark group/link"
                  >
                    Detail Proyek
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* 6. CLIENTS / PARTNER LOGOS */}
      <section className="bg-strum-dark-sec/20 border-y border-strum-dark-ter py-12 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center text-xs font-bold text-strum-text-muted uppercase tracking-widest">
          Dipercaya oleh Perusahaan & Mitra Strategis
        </div>
        <div className="relative w-full">
          <div className="animate-marquee flex gap-12 items-center">
            {/* Repeat list twice to ensure infinite loop seamlessly */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="text-lg sm:text-2xl font-bold tracking-wider text-strum-text-muted hover:text-white transition-colors cursor-default whitespace-nowrap bg-strum-dark-sec border border-strum-dark-ter py-3 px-6 rounded-xl hover:border-strum-orange/30 shadow-lg shadow-black/10"
              >
                🏢 {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-12">
        <ScrollAnimate className="text-center flex flex-col items-center gap-4" direction="up" duration={0.6}>
          <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10">
            Testimonial
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apa Kata Klien Kami
          </h2>
          <p className="text-strum-text-muted max-w-2xl text-base">
            Ulasan jujur dari pelanggan kami yang telah merasakan manfaat solusi kelistrikan dan penghematan biaya listrik bersama Strum Technology.
          </p>
        </ScrollAnimate>

        <ScrollAnimate direction="up" delay={0.2} duration={0.6}>
          <TestimonialCarousel testimonials={testimonials} />
        </ScrollAnimate>
      </section>

      {/* 8. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ScrollAnimate direction="up" duration={0.8}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-strum-orange-dark to-strum-orange p-12 md:p-20 text-center flex flex-col items-center gap-6 shadow-2xl border border-strum-orange/20">
            {/* Backdrop overlay decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#ffffff18,transparent_50%)] pointer-events-none" />

            {/* Large decorative white icon in the corner */}
            <Zap className="absolute -top-12 -right-12 w-72 h-72 text-white/10 -rotate-12 pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
              Siap Beralih ke Energi Terbarukan & Hemat Listrik?
            </h2>

            <p className="text-white/90 max-w-xl text-base sm:text-lg">
              Hubungi tim ahli kami untuk melakukan audit energi gratis atau rancang desain PLTS atap terbaik untuk properti Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <Link href="/kontak" className="w-full sm:w-auto">
                <Button className="w-full bg-white hover:bg-zinc-100 text-strum-orange-dark font-bold rounded-lg px-8 py-6 text-base transition-all hover:scale-105 border-none shadow-xl shadow-black/20">
                  Konsultasi Gratis
                </Button>
              </Link>
              <Link href="/layanan" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-white font-bold rounded-lg px-8 py-6 text-base transition-all hover:scale-105">
                  Lihat Layanan
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimate>
      </section>
    </div>
  );
}
