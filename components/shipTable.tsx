'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Ship } from '@prisma/client';

interface Props {
  ships: Ship[] | null;
  error: string | null;
}

const ShipTable: React.FC<Props> = ({ ships, error }) => {
  const router = useRouter();

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!ships) {
    return <div>Loading...</div>;
  }

  const handleViewShipments = (shipId: string) => {
    router.push(`/ship/${shipId}`);
  };

  return (
    <div>
      <div className="mb-4"></div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 md:text-sm">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4">#</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Ship Name</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Shipments</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship, index) => (
              <tr key={ship.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-2 px-2 md:py-3 md:px-4 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  {ship.id}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <button
                    onClick={() => handleViewShipments(ship.id)}
                    className="text-blue-600 hover:underline"
                  >
                    View shipments made by {ship.id}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipTable;