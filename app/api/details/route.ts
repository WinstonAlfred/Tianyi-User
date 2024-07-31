// app/api/details/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const details = await prisma.detail.findMany();
    return NextResponse.json(details);
  } catch (error) {
    console.error('Error fetching details:', error);
    return NextResponse.json({ error: 'Failed to fetch details' }, { status: 500 });
  }
}