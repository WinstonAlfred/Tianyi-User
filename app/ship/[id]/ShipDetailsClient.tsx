'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Ship, Shipment } from '@prisma/client';

interface Props {
  ship: Ship | null;
  shipments: Shipment[];
  error?: string;
}

export default function ShipDetailsClient({ ship, shipments, error }: Props) {
  const router = useRouter();

  const handleViewShipmentData = (shipmentId: string) => {
    router.push(`/shipment/${shipmentId}`);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!ship) {
    return <div>Ship not found</div>;
  }

  return (
    <div>
      <h1 className="bg-gray-200 p-4 rounded-md mb-4 text-xl font-bold">Shipments: {ship.id}</h1>
      {shipments.length === 0 ? (
        <p>No shipments found for this ship.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Shipment ID</th>
                <th className="py-3 px-6">More</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="bg-white border-b">
                  <td className="py-4 px-6">{shipment.id}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewShipmentData(shipment.id)}
                      className="text-blue-600 hover:underline"
                    >
                      View Shipment Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}