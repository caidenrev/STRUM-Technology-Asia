import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Zap, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  settings?: {
    companyName: string;
    tagline: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
    socialInstagram: string;
    socialLinkedIn: string;
    socialYouTube: string;
  };
}

const defaultSettings = {
  companyName: 'Strum Technology Asia',
  tagline: 'Powering a Brighter Future',
  contactPhone: '+62 812-3456-7890',
  contactEmail: 'info@strumtechnology.co.id',
  address: 'Jl. Kelistrikan No. 88, Kav. 12, Jakarta Barat, DKI Jakarta, 11520',
  socialInstagram: 'https://instagram.com/strumtechnology',
  socialLinkedIn: 'https://linkedin.com/company/strumtechnology',
  socialYouTube: 'https://youtube.com/strumtechnology',
};

export default function Footer({ settings = defaultSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-strum-dark border-t border-strum-dark-ter text-strum-text-sec">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-strum-orange flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">STRUM</span>
                <span className="text-[9px] tracking-widest text-strum-text-muted font-semibold uppercase leading-none">
                  TECHNOLOGY ASIA
                </span>
              </div>
            </Link>
            <p className="text-sm text-strum-text-muted mt-2">
              {settings.tagline}. Solusi kelistrikan modern, instalasi panel surya PLTS, dan audit energi terpercaya di Indonesia.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={settings.socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-strum-dark-sec border border-strum-dark-ter flex items-center justify-center text-strum-text-sec hover:bg-strum-orange hover:text-white hover:border-strum-orange transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-strum-dark-sec border border-strum-dark-ter flex items-center justify-center text-strum-text-sec hover:bg-strum-orange hover:text-white hover:border-strum-orange transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socialYouTube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-strum-dark-sec border border-strum-dark-ter flex items-center justify-center text-strum-text-sec hover:bg-strum-orange hover:text-white hover:border-strum-orange transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Peta Situs</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-strum-orange transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-strum-orange transition-colors">
                  Layanan Kelistrikan
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="hover:text-strum-orange transition-colors">
                  Aktivitas & Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-strum-orange transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-strum-orange transition-colors">
                  Kontak Perusahaan
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Layanan Utama</h4>
            <ul className="space-y-4 text-sm text-strum-text-muted">
              <li>
                <Link href="/layanan/instalasi-panel-surya-residensial" className="hover:text-strum-orange transition-colors">
                  PLTS Atap Residensial
                </Link>
              </li>
              <li>
                <Link href="/layanan/instalasi-panel-surya-komersial" className="hover:text-strum-orange transition-colors">
                  PLTS Atap Komersial
                </Link>
              </li>
              <li>
                <Link href="/layanan/instalasi-panel-surya-industri" className="hover:text-strum-orange transition-colors">
                  PLTS Atap Industri
                </Link>
              </li>
              <li>
                <Link href="/layanan/instalasi-kelistrikan-gedung" className="hover:text-strum-orange transition-colors">
                  Kelistrikan Gedung
                </Link>
              </li>
              <li>
                <Link href="/layanan/maintenance-dan-servis" className="hover:text-strum-orange transition-colors">
                  Pemeliharaan & Servis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-2">Hubungi Kami</h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-strum-orange shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-strum-orange shrink-0" />
              <span>{settings.contactPhone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-strum-orange shrink-0" />
              <span>{settings.contactEmail}</span>
            </div>
          </div>
        </div>

        {/* Border line & Copyright */}
        <div className="border-t border-strum-dark-ter mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-strum-text-muted">
            &copy; {currentYear} {settings.companyName}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-6 text-xs text-strum-text-muted">
            <Link href="#" className="hover:text-strum-orange transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:text-strum-orange transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
