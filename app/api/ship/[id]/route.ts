// app/api/ship/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const ship = await prisma.ship.findUnique({
      where: { id: params.id },
    });
    if (!ship) {
      return NextResponse.json({ error: 'Ship not found' }, { status: 404 });
    }
    return NextResponse.json(ship);
  } catch (error) {
    console.error(`Error fetching ship with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch ship' }, { status: 500 });
  }
}