import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/sections/AdminDashboard';

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', '', { maxAge: 0, path: '/' });
    redirect('/admin/login');
  }

  // Load all required data from MySQL
  const [services, activities, testimonials, settings, inquiries] = await Promise.all([
    db.service.findMany({ orderBy: { order: 'asc' } }),
    db.activity.findMany({ orderBy: { date: 'desc' } }),
    db.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
    db.globalSetting.findFirst(),
    db.contactInquiry.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return (
    <div className="min-h-screen bg-[#090d16] text-white">
      <AdminDashboard
        user={session}
        initialServices={services}
        initialActivities={activities}
        initialTestimonials={testimonials}
        initialSettings={settings || undefined}
        initialInquiries={inquiries}
      />
    </div>
  );
}
