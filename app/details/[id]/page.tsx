import React from 'react';
import { prisma } from '@/lib/prisma';
import type { Detail } from '@prisma/client';
import DetailsTable from '@/components/detailsTable';

async function getAllDetails(): Promise<{ details: Detail[], error: string | null }> {
  try {
    console.log('Attempting to fetch all details');
    const details = await prisma.detail.findMany();
    console.log(`Successfully fetched ${details.length} details`);
    return { details, error: null };
  } catch (error) {
    console.error('Error fetching details:', error);
    return { details: [], error: 'Error fetching details data' };
  }
}

export default async function DetailPage() {
  const { details, error } = await getAllDetails();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
      <DetailsTable details={details} error={error} />
    </div>
  );
}