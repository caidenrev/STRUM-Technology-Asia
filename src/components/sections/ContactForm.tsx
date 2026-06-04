'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const services = [
  'Instalasi Panel Surya Residensial',
  'Instalasi Panel Surya Komersial',
  'Instalasi Panel Surya Industri',
  'Instalasi Kelistrikan Gedung',
  'Instalasi CCTV & Keamanan',
  'Genset & UPS',
  'Konsultasi & Audit Energi',
  'Maintenance & Servis',
  'Tanya Layanan Lain',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    city: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Nama lengkap wajib diisi.';
    
    if (!form.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format email tidak valid.';
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi.';
    } else if (!/^\+?[0-9]{8,15}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid (8-15 digit).';
    }

    if (!form.serviceType) newErrors.serviceType = 'Silakan pilih jenis layanan.';
    if (!form.city.trim()) newErrors.city = 'Kota domisili wajib diisi.';
    if (!form.message.trim()) newErrors.message = 'Pesan atau pertanyaan wajib diisi.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          city: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-strum-dark-sec border border-strum-dark-ter rounded-3xl p-8 md:p-10 shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-white mb-2">Formulir Konsultasi & Penawaran</h3>
        
        {/* Success / Error Messages */}
        {status === 'success' && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm font-medium">
            ✓ Formulir Anda berhasil dikirim! Tim representatif kami akan menghubungi Anda segera.
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-medium">
            ✗ Gagal mengirim formulir. Pastikan semua input benar atau coba lagi nanti.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-semibold text-strum-text-sec">Nama Lengkap</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={form.name}
              onChange={handleChange}
              className={`bg-strum-dark/50 border-strum-dark-ter text-white placeholder:text-strum-text-muted focus:border-strum-orange ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-semibold text-strum-text-sec">Alamat Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
              className={`bg-strum-dark/50 border-strum-dark-ter text-white placeholder:text-strum-text-muted focus:border-strum-orange ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-strum-text-sec">Nomor Telepon / WhatsApp</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Contoh: 08123456789"
              value={form.phone}
              onChange={handleChange}
              className={`bg-strum-dark/50 border-strum-dark-ter text-white placeholder:text-strum-text-muted focus:border-strum-orange ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="city" className="text-sm font-semibold text-strum-text-sec">Kota Domisili</Label>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="Contoh: Jakarta Barat, Surabaya"
              value={form.city}
              onChange={handleChange}
              className={`bg-strum-dark/50 border-strum-dark-ter text-white placeholder:text-strum-text-muted focus:border-strum-orange ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
          </div>
        </div>

        {/* Service Dropdown */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="serviceType" className="text-sm font-semibold text-strum-text-sec">Layanan yang Diminati</Label>
          <select
            id="serviceType"
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-md bg-strum-dark/50 border border-strum-dark-ter text-white text-sm focus:border-strum-orange focus:ring-1 focus:ring-strum-orange outline-none ${errors.serviceType ? 'border-red-500' : ''}`}
          >
            <option value="" className="bg-strum-dark-sec">-- Pilih Layanan --</option>
            {services.map((svc) => (
              <option key={svc} value={svc} className="bg-strum-dark-sec">
                {svc}
              </option>
            ))}
          </select>
          {errors.serviceType && <span className="text-xs text-red-500">{errors.serviceType}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-sm font-semibold text-strum-text-sec">Pesan / Detail Kebutuhan</Label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Jelaskan kebutuhan kelistrikan atau kapasitas panel surya yang Anda inginkan..."
            value={form.message}
            onChange={handleChange}
            className={`w-full p-3 rounded-md bg-strum-dark/50 border border-strum-dark-ter text-white text-sm focus:border-strum-orange focus:ring-1 focus:ring-strum-orange outline-none ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-strum-orange hover:bg-strum-orange-dark text-white font-bold py-6 rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-strum-orange/20 cursor-pointer"
        >
          {loading ? 'Mengirim...' : 'Kirim Formulir'}
        </Button>
      </form>
    </div>
  );
}
