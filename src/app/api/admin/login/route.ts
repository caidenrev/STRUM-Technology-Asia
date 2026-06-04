import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { setSessionCookie } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi.' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Kredensial login tidak valid.' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Kredensial login tidak valid.' },
        { status: 401 }
      );
    }

    // Set cookie session
    await setSessionCookie({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return NextResponse.json({ success: true, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server.' },
      { status: 500 }
    );
  }
}
