import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

// CREATE
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, position, company, avatar, rating, content, isActive } = body;

    const testimonial = await db.testimonial.create({
      data: {
        name,
        position,
        company,
        avatar,
        rating: Number(rating) || 5,
        content,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json({ error: 'Gagal membuat testimoni baru.' }, { status: 500 });
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
    const { id, name, position, company, avatar, rating, content, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
    }

    const testimonial = await db.testimonial.update({
      where: { id: Number(id) },
      data: {
        name,
        position,
        company,
        avatar,
        rating: Number(rating) || 5,
        content,
        isActive,
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui testimoni.' }, { status: 500 });
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

    await db.testimonial.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json({ error: 'Gagal menghapus testimoni.' }, { status: 500 });
  }
}
