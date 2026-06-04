import React from 'react';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { db } from '@/lib/db';
import ContactForm from '@/components/sections/ContactForm';

export default async function ContactPage() {
  const settings = await db.globalSetting.findFirst();

  const phone = settings?.contactPhone || '+62 812-3456-7890';
  const email = settings?.contactEmail || 'info@strumtechnology.co.id';
  const address = settings?.address || 'Jl. Kelistrikan No. 88, Kav. 12, Jakarta Barat, DKI Jakarta, 11520';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col gap-16 text-white">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10">
          Hubungi Kami
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Mulailah Efisiensi Energi Anda Hari Ini
        </h1>
        <p className="text-strum-text-muted max-w-2xl text-base sm:text-lg">
          Ada pertanyaan atau butuh penawaran resmi? Jangan ragu untuk mengirimkan formulir konsultasi atau mengunjungi kantor operasional kami.
        </p>
      </div>

      {/* Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Info Column (2/5 size) */}
        <div className="lg:col-span-2 flex flex-col gap-8 bg-strum-dark-sec/45 border border-strum-dark-ter p-8 rounded-3xl backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Informasi Kontak</h3>
            <p className="text-sm text-strum-text-muted">Gunakan jalur komunikasi resmi di bawah untuk terhubung langsung.</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-strum-text-muted font-semibold uppercase tracking-wider">Alamat Kantor</span>
                <span className="text-sm text-strum-text-sec">{address}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-strum-text-muted font-semibold uppercase tracking-wider">Telepon / WhatsApp</span>
                <span className="text-sm text-strum-text-sec">{phone}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-strum-text-muted font-semibold uppercase tracking-wider">Email Resmi</span>
                <span className="text-sm text-strum-text-sec">{email}</span>
              </div>
            </div>

            {/* Operations Hour */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-strum-text-muted font-semibold uppercase tracking-wider">Jam Operasional</span>
                <span className="text-sm text-strum-text-sec">Senin – Jumat: 08:00 – 17:00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (3/5 size) */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>

      {/* Map Embed */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-strum-orange" />
          Lokasi Kantor Operasional kami
        </h3>
        <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-strum-dark-ter shadow-2xl bg-zinc-900">
          <iframe
            title="Lokasi Strum Technology Asia"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126934.8099824647!2d106.78919638841053!3d-6.175387114620021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x500c5c4e101a1e0!2sJakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="contrast-[1.2] invert-[0.9]"
          />
        </div>
      </div>
    </div>
  );
}
