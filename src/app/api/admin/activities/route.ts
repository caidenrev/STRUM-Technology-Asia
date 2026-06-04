import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

// Helper to convert Title to Slug
const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// CREATE
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, date, location, client, thumbnail, gallery, description, participants, capacity, isPublished, isFeatured } = body;

    const activity = await db.activity.create({
      data: {
        title,
        slug: generateSlug(title),
        category,
        date: new Date(date),
        location,
        client,
        thumbnail,
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        description,
        participants: participants ? Number(participants) : null,
        capacity,
        isPublished: isPublished ?? true,
        isFeatured: isFeatured ?? false,
      },
    });

    return NextResponse.json({ success: true, activity });
  } catch (error) {
    console.error('Create activity error:', error);
    return NextResponse.json({ error: 'Gagal membuat kegiatan baru.' }, { status: 500 });
  }
}

// UPDATE
export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, category, date, location, client, thumbnail, gallery, description, participants, capacity, isPublished, isFeatured } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
    }

    const activity = await db.activity.update({
      where: { id: Number(id) },
      data: {
        title,
        slug: generateSlug(title),
        category,
        date: new Date(date),
        location,
        client,
        thumbnail,
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        description,
        participants: participants ? Number(participants) : null,
        capacity,
        isPublished,
        isFeatured,
      },
    });

    return NextResponse.json({ success: true, activity });
  } catch (error) {
    console.error('Update activity error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui kegiatan.' }, { status: 500 });
  }
}

// DELETE
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

    await db.activity.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete activity error:', error);
    return NextResponse.json({ error: 'Gagal menghapus kegiatan.' }, { status: 500 });
  }
}
