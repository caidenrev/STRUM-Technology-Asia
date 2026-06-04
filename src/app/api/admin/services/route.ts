import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

// Helper to convert Title to Slug
const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// CREATE (POST)
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, icon, shortDescription, fullDescription, coverImage, gallery, benefits, faqs, isActive, order } = body;

    const service = await db.service.create({
      data: {
        title,
        slug: generateSlug(title),
        icon: icon || 'Zap',
        shortDescription,
        fullDescription,
        coverImage,
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        benefits: typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []),
        faqs: typeof faqs === 'string' ? faqs : JSON.stringify(faqs || []),
        isActive: isActive ?? true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Gagal membuat layanan baru.' }, { status: 500 });
  }
}

// UPDATE (PUT)
export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, icon, shortDescription, fullDescription, coverImage, gallery, benefits, faqs, isActive, order } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id: Number(id) },
      data: {
        title,
        slug: generateSlug(title),
        icon,
        shortDescription,
        fullDescription,
        coverImage,
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        benefits: typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []),
        faqs: typeof faqs === 'string' ? faqs : JSON.stringify(faqs || []),
        isActive,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui layanan.' }, { status: 500 });
  }
}

// DELETE (DELETE)
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
    }

    await db.service.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: 'Gagal menghapus layanan.' }, { status: 500 });
  }
}
