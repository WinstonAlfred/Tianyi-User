'use client'

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Ship, Shipment } from '@prisma/client';

interface Props {
  ship: Ship | null;
  shipments: Shipment[];
  error?: string;
}

export default function ShipDetailsClient({ ship, shipments, error }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;

  const handleViewShipmentData = (shipmentId: string) => {
    router.push(`/shipment/${shipmentId}`);
  };

  const sortShipments = (shipments: Shipment[], order: 'asc' | 'desc'): Shipment[] => {
    return [...shipments].sort((a, b) => {
      if (order === 'asc') {
        return a.id.localeCompare(b.id);
      } else {
        return b.id.localeCompare(a.id);
      }
    });
  };

  const filteredAndSortedShipments = useMemo(() => {
    const filtered = shipments.filter((shipment) =>
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortShipments(filtered, sortOrder);
  }, [shipments, searchTerm, sortOrder]);

  const pageCount = Math.ceil(filteredAndSortedShipments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedShipments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1); // Reset to first page on sort change
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
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by Shipment ID"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {/* Optional: Implement additional search functionality */}}
        >
          Search
        </button>
      </div>
      {currentItems.length === 0 ? (
        <p>No shipments found for this ship.</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">
                    Shipment ID
                    <button
                      onClick={toggleSortOrder}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      {sortOrder === 'asc' ? '▲' : '▼'}
                    </button>
                  </th>
                  <th className="py-3 px-6">More</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((shipment) => (
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
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.min(10, pageCount) }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}