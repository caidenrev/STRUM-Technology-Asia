import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { db } from '@/lib/db';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Query global settings from MySQL
  const settings = await db.globalSetting.findFirst();

  const footerSettings = settings
    ? {
        companyName: settings.companyName,
        tagline: settings.tagline,
        contactPhone: settings.contactPhone,
        contactEmail: settings.contactEmail,
        address: settings.address,
        socialInstagram: settings.socialInstagram,
        socialLinkedIn: settings.socialLinkedIn,
        socialYouTube: settings.socialYouTube,
      }
    : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-strum-dark text-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer Details */}
      <Footer settings={footerSettings} />

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppButton number={settings?.whatsappNumber} />
    </div>
  );
}
