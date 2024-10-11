import React from 'react';
import { prisma } from '@/lib/prisma';  // Adjust the import path as needed
import SailingReportTimeline from '@/components/sailReportTimeline';
import Link from 'next/link';

async function getDetail(id: string) {
  try {
    const detail = await prisma.detail.findUnique({
      where: { id },
      select: { Sailing_report: true, id: true }
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

export default async function SailingReportPage({ params }: { params: { id: string } }) {
  try {
    const detail = await getDetail(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <SailingReportTimeline sailingData={detail.Sailing_report} shipmentId={detail.id} />
        <div className="mt-8 text-center">
          <Link href="/shipment" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Back to Shipments
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 text-xl mb-4">
          {(error as Error).message}
        </div>
        <Link href="/shipment" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Back to Shipments
        </Link>
      </div>
    );
  }
}