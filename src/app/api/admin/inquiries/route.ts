import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

// UPDATE (Mark as Read / Responded)
export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Data tidak lengkap.' }, { status: 400 });
    }

    const inquiry = await db.contactInquiry.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui status inquiry.' }, { status: 500 });
  }
}

// DELETE (Delete inquiry entry)
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

    await db.contactInquiry.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json({ error: 'Gagal menghapus inquiry.' }, { status: 500 });
  }
}
