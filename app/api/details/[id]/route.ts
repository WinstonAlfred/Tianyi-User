// app/api/details/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const detail = await prisma.detail.findUnique({
      where: { id: params.id },
    });
    if (!detail) {
      return NextResponse.json({ error: 'Detail not found' }, { status: 404 });
    }
    return NextResponse.json(detail);
  } catch (error) {
    console.error(`Error fetching detail with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch detail' }, { status: 500 });
  }
}