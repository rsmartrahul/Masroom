import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { hashPassword } from '@/lib/password';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const name = String(body.name || '').trim();
    const phone = body.phone ? String(body.phone).trim() : undefined;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const users = db.collection('users');
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date();

    const result = await users.insertOne({
      email,
      name,
      phone,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      user: {
        id: result.insertedId.toString(),
        email,
        name,
        phone,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
