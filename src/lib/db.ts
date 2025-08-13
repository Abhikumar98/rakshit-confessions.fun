import { Pool } from 'pg';

// Reuse a single pool instance in development to avoid exhausting database connections during hot reloads.
declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

console.log('process.env.POSTGRES_URL', process.env.POSTGRES_URL);

if (!process.env.POSTGRES_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    'POSTGRES_URL is not set. Falling back to default localhost connection which may fail.'
  );
}

const pool =
  global.pgPool ||
  new Pool({
    connectionString: process.env.POSTGRES_URL,
    // Supabase requires SSL in production
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  });

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool;
}

// Ensure the required table exists (idempotent)
// void pool
//   .query(`
//     CREATE TABLE IF NOT EXISTS confessions (
//       id BIGSERIAL PRIMARY KEY,
//       confession TEXT NOT NULL,
//       created_at TIMESTAMPTZ DEFAULT NOW()
//     );
//   `)
//   .catch((error: unknown) => {
//     // eslint-disable-next-line no-console
//     console.error('Failed to ensure confessions table exists', error);
//   });

export default pool;
