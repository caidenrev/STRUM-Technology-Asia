import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

// UPDATE
export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // We only update the singleton with id = 1
    const settings = await db.globalSetting.upsert({
      where: { id: 1 },
      update: {
        companyName: body.companyName,
        tagline: body.tagline,
        heroTitle: body.heroTitle,
        heroSubtitle: body.heroSubtitle,
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail,
        whatsappNumber: body.whatsappNumber,
        address: body.address,
        socialInstagram: body.socialInstagram,
        socialLinkedIn: body.socialLinkedIn,
        socialYouTube: body.socialYouTube,
        statsProjects: Number(body.statsProjects) || 0,
        statsCapacity: body.statsCapacity,
        statsYears: Number(body.statsYears) || 0,
        statsClients: Number(body.statsClients) || 0,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        ogImage: body.ogImage,
      },
      create: {
        id: 1,
        companyName: body.companyName || 'Strum Technology Asia',
        tagline: body.tagline || 'Powering a Brighter Future',
        heroTitle: body.heroTitle || 'Solusi Kelistrikan & Energi Terbarukan Terpercaya',
        heroSubtitle: body.heroSubtitle || 'Kami menyediakan layanan instalasi panel surya PLTS, kelistrikan gedung, CCTV, dan backup power berkualitas tinggi untuk efisiensi energi Anda.',
        contactPhone: body.contactPhone || '+62 812-3456-7890',
        contactEmail: body.contactEmail || 'info@strumtechnology.co.id',
        whatsappNumber: body.whatsappNumber || '6281234567890',
        address: body.address || 'Jl. Kelistrikan No. 88, Kav. 12, Jakarta Barat, DKI Jakarta, 11520',
        socialInstagram: body.socialInstagram || 'https://instagram.com/strumtechnology',
        socialLinkedIn: body.socialLinkedIn || 'https://linkedin.com/company/strumtechnology',
        socialYouTube: body.socialYouTube || 'https://youtube.com/strumtechnology',
        statsProjects: Number(body.statsProjects) || 150,
        statsCapacity: body.statsCapacity || '2.5 MWp',
        statsYears: Number(body.statsYears) || 10,
        statsClients: Number(body.statsClients) || 200,
        seoTitle: body.seoTitle || 'Strum Technology Asia',
        seoDescription: body.seoDescription || 'Solusi kelistrikan, sistem panel surya PLTS, dan energi terbarukan terbaik di Indonesia.',
        ogImage: body.ogImage || '/og-image.jpg',
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui pengaturan website.' }, { status: 500 });
  }
}
