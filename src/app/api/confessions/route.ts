import { NextResponse } from 'next/server';

import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { confession } = await request.json();

    console.log('New confession received:', confession);

    // Persist the new confession to the database
    const { rows } = await pool.query(
      'INSERT INTO confessions (confession) VALUES ($1) RETURNING id, confession, created_at',
      [confession]
    );

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while handling confession:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
