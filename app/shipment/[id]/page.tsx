import React from 'react';
import { getShipmentById } from '@/lib/get/getShipment'; // Adjust the import path as needed
import ShipmentTable from '@/components/shipmentTable'; // Adjust the import path as needed

export default async function SpecificShipmentPage({ params }: { params: { id: string } }) {
  let shipment = null;
  let error = null;

  try {
    shipment = await getShipmentById(params.id);
    if (!shipment) {
      error = 'Shipment not found';
    }
  } catch (err) {
    console.error('Error fetching shipment:', err);
    error = 'Error fetching shipment data';
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shipment Details</h1>
      <ShipmentTable shipments={shipment ? [shipment] : []} error={error} />
    </div>
  );
}