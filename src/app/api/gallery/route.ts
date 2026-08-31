import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { put, del } from '@vercel/blob';
import { initDB } from '@/lib/db';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

// GET — list gallery items
export async function GET() {
  try {
    await initDB();
    const result = await sql`
      SELECT id, blob_url, caption, category, created_at
      FROM gallery_items
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error('Gallery GET error:', error);
    return NextResponse.json({ items: [] });
  }
}

// POST — upload new image (admin only)
export async function POST(request: NextRequest) {
  // Auth check
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await initDB();
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string || '';
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`gallery/${Date.now()}-${file.name}`, file, { access: 'public' });

    // Save metadata to Postgres
    await sql`
      INSERT INTO gallery_items (blob_url, blob_pathname, caption, category)
      VALUES (${blob.url}, ${blob.pathname}, ${caption}, ${category})
    `;

    return NextResponse.json({ success: true, url: blob.url }, { status: 201 });
  } catch (error) {
    console.error('Gallery POST error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// DELETE — remove gallery item (admin only)
export async function DELETE(request: NextRequest) {
  // Auth check
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, blob_pathname } = await request.json();
    if (!id) return NextResponse.json({ error: 'No id' }, { status: 400 });

    // Delete from Blob storage
    if (blob_pathname) {
      try { await del(blob_pathname); } catch { /* blob may already be gone */ }
    }

    // Delete from Postgres
    await sql`DELETE FROM gallery_items WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery DELETE error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
