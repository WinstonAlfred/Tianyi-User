// app/api/shipments/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: params.id },
    });
    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    return NextResponse.json(shipment);
  } catch (error) {
    console.error(`Error fetching shipment with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch shipment' }, { status: 500 });
  }
}