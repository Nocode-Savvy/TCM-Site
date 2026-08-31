import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { initDB } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    await initDB();

    const body = await request.json();
    const {
      name, phone, email, service_type,
      bedrooms, bathrooms, address, preferred_date,
      addons, notes, agreed_to_policy,
    } = body;

    if (!name || !phone || !service_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO bookings (
        name, phone, email, service_type,
        bedrooms, bathrooms, address, preferred_date,
        addons, notes, agreed_to_policy
      ) VALUES (
        ${name}, ${phone}, ${email || null}, ${service_type},
        ${bedrooms ? parseInt(bedrooms) : null}, ${bathrooms ? parseFloat(bathrooms) : null},
        ${address}, ${preferred_date || null},
        ${addons || []}, ${notes || null}, ${agreed_to_policy}
      )
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
