import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, city, message } = body;

    // Simple backend validation
    if (!name || !email || !phone || !serviceType || !city || !message) {
      return NextResponse.json(
        { error: 'Seluruh input wajib diisi dengan benar.' },
        { status: 400 }
      );
    }

    // Save into database
    const inquiry = await db.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        serviceType,
        city,
        message,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error('Contact inquiry error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem, silakan coba beberapa saat lagi.' },
      { status: 500 }
    );
  }
}
