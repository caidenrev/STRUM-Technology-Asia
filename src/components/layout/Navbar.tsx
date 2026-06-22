'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LayoutGrid, Home, Building2, Factory, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Kegiatan', href: '/kegiatan' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div
        className={`mx-auto max-w-7xl h-16 rounded-full px-6 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'bg-strum-dark/85 backdrop-blur-md border border-white/10 shadow-lg shadow-black/40'
            : 'bg-strum-dark-sec/55 backdrop-blur-sm border border-white/5 shadow-md shadow-black/10'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
            <Image src="/logo.png" alt="Strum Logo" fill sizes="32px" className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-strum-orange transition-colors">
              STRUM
            </span>
            <span className="text-[8px] tracking-widest text-strum-text-muted font-semibold uppercase leading-none">
              ASIA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-xs uppercase tracking-wider font-bold transition-colors py-2 hover:text-strum-orange ${
              pathname === '/' ? 'text-strum-orange font-extrabold' : 'text-strum-text-sec'
            }`}
          >
            Beranda
          </Link>

          {/* Custom State Dropdown Menu for Services */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold transition-colors py-2 text-strum-text-sec hover:text-strum-orange outline-none cursor-pointer"
            >
              Layanan
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-strum-orange' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-strum-dark-sec/95 border border-white/10 backdrop-blur-md rounded-2xl p-2 text-white shadow-2xl mt-2 transition-all duration-200 flex flex-col gap-1 ${
                dropdownOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <Link
                href="/layanan/instalasi-panel-surya-residensial"
                onClick={() => setDropdownOpen(false)}
                className="hover:bg-strum-orange hover:text-white rounded-xl py-2 px-3 transition-colors flex items-center gap-2.5 group"
              >
                <Home className="w-4 h-4 text-strum-orange group-hover:text-white transition-colors" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-xs text-white">PLTS Residensial</span>
                  <span className="text-[9px] text-strum-text-muted group-hover:text-white/80 transition-colors">Rumah & Apartemen</span>
                </div>
              </Link>

              <Link
                href="/layanan/instalasi-panel-surya-komersial"
                onClick={() => setDropdownOpen(false)}
                className="hover:bg-strum-orange hover:text-white rounded-xl py-2 px-3 transition-colors flex items-center gap-2.5 group"
              >
                <Building2 className="w-4 h-4 text-strum-orange group-hover:text-white transition-colors" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-xs text-white">PLTS Komersial</span>
                  <span className="text-[9px] text-strum-text-muted group-hover:text-white/80 transition-colors">Ruko & Gedung Bisnis</span>
                </div>
              </Link>

              <Link
                href="/layanan/instalasi-panel-surya-industri"
                onClick={() => setDropdownOpen(false)}
                className="hover:bg-strum-orange hover:text-white rounded-xl py-2 px-3 transition-colors flex items-center gap-2.5 group"
              >
                <Factory className="w-4 h-4 text-strum-orange group-hover:text-white transition-colors" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-xs text-white">PLTS Industri</span>
                  <span className="text-[9px] text-strum-text-muted group-hover:text-white/80 transition-colors">Pabrik & Gudang Manufaktur</span>
                </div>
              </Link>

              <Link
                href="/layanan/instalasi-kelistrikan-gedung"
                onClick={() => setDropdownOpen(false)}
                className="hover:bg-strum-orange hover:text-white rounded-xl py-2 px-3 transition-colors flex items-center gap-2.5 group"
              >
                <Cable className="w-4 h-4 text-strum-orange group-hover:text-white transition-colors" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-xs text-white">Kelistrikan Gedung</span>
                  <span className="text-[9px] text-strum-text-muted group-hover:text-white/80 transition-colors">Wiring & Panel Distribusi</span>
                </div>
              </Link>

              <div className="border-t border-white/5 my-1" />

              <Link
                href="/layanan"
                onClick={() => setDropdownOpen(false)}
                className="hover:bg-strum-orange hover:text-white rounded-xl py-2.5 px-3 justify-center text-xs font-bold text-strum-orange flex items-center gap-1.5 transition-colors group"
              >
                <LayoutGrid className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors">Lihat Semua Layanan</span>
              </Link>
            </div>
          </div>

          {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-wider font-bold transition-colors py-2 hover:text-strum-orange ${
                  isActive ? 'text-strum-orange font-extrabold' : 'text-strum-text-sec'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link href="/kontak">
            <Button className="bg-strum-orange hover:bg-strum-orange-dark text-white font-bold rounded-full px-5 py-2 text-xs transition-all hover:scale-105 active:scale-95 border-none shadow-md shadow-strum-orange/20 cursor-pointer">
              Hubungi Kami
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-strum-text-sec hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Panel */}
      <div
        className={`mx-auto max-w-7xl mt-2 w-full bg-strum-dark/95 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-white shadow-2xl transition-all duration-300 md:hidden pointer-events-auto origin-top ${
          isMobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0 visible'
            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm font-bold transition-colors hover:text-strum-orange ${
              pathname === '/' ? 'text-strum-orange' : 'text-strum-text-sec'
            }`}
          >
            Beranda
          </Link>
          
          <div className="border-t border-white/5 my-1" />
          
          {/* Layanan Dropdown Trigger for Mobile */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="flex items-center justify-between text-sm font-bold text-strum-text-sec hover:text-strum-orange transition-colors py-2 outline-none text-left cursor-pointer"
            >
              <span>Layanan</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180 text-strum-orange' : ''}`} />
            </button>
            
            {/* Layanan Dropdown Content for Mobile - Large touch targets */}
            <div
              className={`transition-all duration-300 overflow-hidden flex flex-col gap-2 ${
                isMobileServicesOpen ? 'max-h-[350px] mt-2 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <Link
                href="/layanan/instalasi-panel-surya-residensial"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileServicesOpen(false);
                }}
                className="bg-white/5 hover:bg-strum-orange text-white rounded-xl py-3 px-4 transition-all flex items-center gap-3"
              >
                <Home className="w-4 h-4 text-strum-orange shrink-0" />
                <span className="font-bold text-xs">PLTS Residensial</span>
              </Link>
              
              <Link
                href="/layanan/instalasi-panel-surya-komersial"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileServicesOpen(false);
                }}
                className="bg-white/5 hover:bg-strum-orange text-white rounded-xl py-3 px-4 transition-all flex items-center gap-3"
              >
                <Building2 className="w-4 h-4 text-strum-orange shrink-0" />
                <span className="font-bold text-xs">PLTS Komersial</span>
              </Link>
              
              <Link
                href="/layanan/instalasi-panel-surya-industri"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileServicesOpen(false);
                }}
                className="bg-white/5 hover:bg-strum-orange text-white rounded-xl py-3 px-4 transition-all flex items-center gap-3"
              >
                <Factory className="w-4 h-4 text-strum-orange shrink-0" />
                <span className="font-bold text-xs">PLTS Industri</span>
              </Link>
              
              <Link
                href="/layanan/instalasi-kelistrikan-gedung"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileServicesOpen(false);
                }}
                className="bg-white/5 hover:bg-strum-orange text-white rounded-xl py-3 px-4 transition-all flex items-center gap-3"
              >
                <Cable className="w-4 h-4 text-strum-orange shrink-0" />
                <span className="font-bold text-xs">Kelistrikan Gedung</span>
              </Link>
              
              <Link
                href="/layanan"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileServicesOpen(false);
                }}
                className="hover:underline text-xs font-bold text-strum-orange flex items-center justify-center gap-1 py-2"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Lihat Semua Layanan</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-white/5 my-1" />

          {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold transition-colors hover:text-strum-orange ${
                  isActive ? 'text-strum-orange' : 'text-strum-text-sec'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          <div className="border-t border-white/5 my-1" />
          
          <Link href="/kontak" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
            <Button className="w-full bg-strum-orange hover:bg-strum-orange-dark text-white font-bold py-3 rounded-full text-xs cursor-pointer border-none shadow-md shadow-strum-orange/20">
              Hubungi Kami
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
