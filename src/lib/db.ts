import { sql } from '@vercel/postgres';

export { sql };

export async function initDB() {
  try {
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

    await sql`
      CREATE TABLE IF NOT EXISTS admin_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
  } catch (error) {
    // Graceful error logging when running locally without active Postgres URL
    console.warn('Database initialization notice:', error);
  }
}

export async function getAdminPasswordHash(): Promise<string | null> {
  try {
    await initDB();
    const result = await sql`
      SELECT value FROM admin_settings WHERE key = 'admin_password_hash' LIMIT 1
    `;
    if (result.rows.length > 0 && result.rows[0].value) {
      return result.rows[0].value;
    }
  } catch {
    // Fallback to env var when DB not connected
  }
  return process.env.ADMIN_PASSWORD_HASH || null;
}

export async function setAdminPasswordHash(hash: string): Promise<boolean> {
  try {
    await initDB();
    await sql`
      INSERT INTO admin_settings (key, value, updated_at)
      VALUES ('admin_password_hash', ${hash}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${hash}, updated_at = NOW()
    `;
    return true;
  } catch (error) {
    console.error('Failed to set admin password hash:', error);
    return false;
  }
}
