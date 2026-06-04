import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, HelpCircle } from 'lucide-react';
import { db } from '@/lib/db';
import LucideIcon from '@/components/ui/LucideIcon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = await db.service.findUnique({
    where: { slug },
  });

  if (!service || !service.isActive) {
    notFound();
  }

  // Safely parse JSON strings
  let gallery: string[] = [];
  let benefits: string[] = [];
  let faqs: { q: string; a: string }[] = [];

  try {
    gallery = JSON.parse(service.gallery);
  } catch (e) {}

  try {
    benefits = JSON.parse(service.benefits);
  } catch (e) {}

  try {
    faqs = JSON.parse(service.faqs);
  } catch (e) {}

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col gap-12 text-white">
      {/* Back button */}
      <div>
        <Link
          href="/layanan"
          className="inline-flex items-center gap-2 text-sm text-strum-text-muted hover:text-strum-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Semua Layanan
        </Link>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange">
            <LucideIcon name={service.icon} className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {service.title}
          </h1>
        </div>
        
        {/* Cover Image */}
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-strum-dark-ter shadow-xl bg-zinc-900">
          <img
            src={service.coverImage || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&h=630&q=80'}
            alt={service.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* Layout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content (2 columns) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Description */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b border-strum-dark-ter pb-2 text-strum-orange">
              Deskripsi Layanan
            </h2>
            <div className="text-strum-text-sec leading-relaxed text-base whitespace-pre-line">
              {service.fullDescription}
            </div>
          </div>

          {/* Benefits */}
          {benefits.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold border-b border-strum-dark-ter pb-2 text-strum-orange">
                Keuntungan & Nilai Tambah
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-strum-text-sec">
                    <div className="w-5 h-5 rounded-full bg-strum-orange/10 flex items-center justify-center text-strum-orange shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold border-b border-strum-dark-ter pb-2 text-strum-orange">
                Dokumentasi Proyek
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative h-44 rounded-xl overflow-hidden border border-strum-dark-ter bg-zinc-900 group"
                  >
                    <img
                      src={url}
                      alt={`Dokumentasi ${service.title} - ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Accordion / FAQs & Sidebar CTA */}
        <div className="flex flex-col gap-8">
          {/* Sidebar CTA */}
          <div className="bg-strum-dark-sec border border-strum-dark-ter rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
            <h3 className="text-lg font-bold">Konsultasi Layanan</h3>
            <p className="text-sm text-strum-text-muted">
              Ada pertanyaan mengenai spesifikasi teknik atau perkiraan harga untuk {service.title}? Hubungi tim representatif kami.
            </p>
            <Link href="/kontak" className="w-full">
              <Button className="w-full bg-strum-orange hover:bg-strum-orange-dark text-white font-semibold py-6">
                Hubungi Kami Sekarang
              </Button>
            </Link>
          </div>

          {/* FAQ Accordion */}
          {faqs.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-strum-orange" />
                FAQ Layanan
              </h3>
              <Accordion className="w-full flex flex-col gap-2">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="bg-strum-dark-sec/50 border border-strum-dark-ter rounded-xl px-4 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm hover:text-strum-orange py-4 border-none hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-strum-text-muted pb-4 border-none">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
