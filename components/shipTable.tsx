import { Ship } from '@prisma/client';
import React from 'react';

async function getShipData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ship`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch ship data');
  }
  return res.json();
}

const ShipTable = async () => {
  const ships = await getShipData();

  return (  
    <div>
      <div className="mb-4">
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 md:text-sm">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4">#</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Ship Name</th>
            </tr>
          </thead>
          <tbody>
          {ships.map((ship: Ship, index: number) => (
              <tr key={ship.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-2 px-2 md:py-3 md:px-4 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  {ship.id}
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