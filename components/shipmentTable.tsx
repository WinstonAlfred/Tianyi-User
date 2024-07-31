import { Shipment } from '@prisma/client';
import React from 'react';

async function getShipmentData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipment`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch shipment data:", error);
    return null;
  }
}

const ShipmentTable = async () => {
  const shipments = await getShipmentData();

  if (!shipments) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Error: Failed to fetch shipment data. Please try again later.</p>
      </div>
    );
  }

  return (  
    <div>
      <div className="mb-4">
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 md:text-sm">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4">#</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Shipment ID</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Status</th>
              <th className="py-2 px-2 md:py-3 md:px-4">From</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Destination</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Products</th>
            </tr>
          </thead>
          <tbody>
          {shipments.map((shipment: Shipment, index: number) => (
              <tr key={shipment.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-2 px-2 md:py-3 md:px-4 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  {shipment.id}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  {shipment.Status}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  {shipment.Ship_from}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  {shipment.Ship_destination}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4">
                  <ul className="list-none p-0 m-0">
                    {shipment.Product.map((product, idx) => (
                      <li key={idx} className="mb-1">
                        {product} ({shipment.Capacity[idx]} tons)
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTable;