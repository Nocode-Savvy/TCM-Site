import { sql } from '@vercel/postgres';

export { sql };

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service_type TEXT NOT NULL,
      bedrooms INT,
      bathrooms INT,
      address TEXT,
      preferred_date TEXT,
      addons TEXT[],
      notes TEXT,
      agreed_to_policy BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id SERIAL PRIMARY KEY,
      blob_url TEXT NOT NULL,
      blob_pathname TEXT NOT NULL,
      caption TEXT,
      category TEXT DEFAULT 'general',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
