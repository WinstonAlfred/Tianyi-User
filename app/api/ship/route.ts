// app/api/ship/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ships = await prisma.ship.findMany();
    return NextResponse.json(ships);
  } catch (error) {
    console.error('Error fetching ships:', error);
    return NextResponse.json({ error: 'Failed to fetch ships' }, { status: 500 });
  }
}