import React from 'react';
import { prisma } from '@/lib/prisma';  // Adjust the import path as needed
import QueueTimeline from '@/components/queueTimeline';
import Link from 'next/link';

async function getDetail(id: string) {
  try {
    const detail = await prisma.detail.findUnique({
      where: { id },
      select: { Queue: true, id: true }
    });

    if (!detail) {
      throw new Error('Detail not found');
    }

    return detail;
  } catch (error) {
    console.error('Error fetching detail:', error);
    throw new Error('Error fetching detail data');
  }
}

export default async function QueuePage({ params }: { params: { id: string } }) {
  try {
    const detail = await getDetail(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <QueueTimeline queueData={detail.Queue} shipmentId={detail.id} />
        <Link href="/shipment" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Shipments
        </Link>
      </div>
    );
  } catch (error) {
    return <div className="text-red-500">{(error as Error).message}</div>;
  }
}