import React from 'react';
import { getDetailById } from '@/lib/get/getDetail'; // Adjust the import path as needed
import DetailsTable from '@/components/detailsTable'; // Adjust the import path as needed

export default async function SpecificDetailPage({ params }: { params: { id: string } }) {
  let detail = null;
  let error = null;

  try {
    detail = await getDetailById(params.id);
    if (!detail) {
      error = 'Shipment details not found';
    }
  } catch (err) {
    console.error('Error fetching shipment:', err);
    error = 'Error fetching shipment data';
  }

  return (
    <div>
      <DetailsTable details={detail ? [detail] : []} error={error} />
    </div>
  );
}