'use client'

import React, { useState } from "react";
import { Shipment } from "@prisma/client";
import Link from "next/link";
import { ArrowUpDown, FileDown, Download, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Props {
  shipments: Shipment[];
  error: string | null;
}

const ShipmentTable: React.FC<Props> = ({ shipments, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 5;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!shipments || shipments.length === 0) {
    return <div>No shipments available.</div>;
  }

  const filteredShipments = shipments
    .filter((shipment) =>
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.id.localeCompare(b.id);
      } else {
        return b.id.localeCompare(a.id);
      }
    });

  const pageCount = Math.ceil(filteredShipments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const exportToExcel = (shipment: Shipment) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([{
      'Shipment ID': shipment.id,
      'Status': shipment.Status,
      'Ship from': shipment.Ship_from,
      'Ship destination': shipment.Ship_destination,
      'Products': shipment.Product?.join(', '),
      'Capacities': shipment.Capacity?.join(', '),
      'Descriptions': shipment.Description?.join(', '),
      'Document Name': shipment.document_name || 'N/A',
      'Document Type': shipment.document_type || 'N/A',
      'Uploaded At': shipment.uploaded_at ? new Date(shipment.uploaded_at).toLocaleString() : 'N/A'
    }]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Shipment");
    XLSX.writeFile(workbook, `Shipment_${shipment.id}.xlsx`);
  };

  const exportAllToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      shipments.map(shipment => ({
        'Shipment ID': shipment.id,
        'Status': shipment.Status,
        'Ship from': shipment.Ship_from,
        'Ship destination': shipment.Ship_destination,
        'Products': shipment.Product?.join(', '),
        'Capacities': shipment.Capacity?.join(', '),
        'Descriptions': shipment.Description?.join(', '),
        'Document Name': shipment.document_name || 'N/A',
        'Document Type': shipment.document_type || 'N/A',
        'Uploaded At': shipment.uploaded_at ? new Date(shipment.uploaded_at).toLocaleString() : 'N/A'
      }))
    );
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Shipments");
    XLSX.writeFile(workbook, "All_Shipments.xlsx");
  };

  const getStatusLink = (status: string, shipmentId: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'loading':
        return `/loading/${shipmentId}`;
      case 'queueing':
        return `/queue/${shipmentId}`;
      case 'pickup':
      case 'ongoing':
        return `/sailingReport/${shipmentId}`;
      case 'unloading':
        return `/unloading/${shipmentId}`;
      case 'finished':
        return `/finish/${shipmentId}`;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-md mb-4 text-lg font-bold">SHIPMENT TABLE</div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="flex flex-grow">
          <input
            type="text"
            placeholder="Search by Shipment ID"
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            onClick={() => {/* Implement additional search functionality if needed */}}
          >
            <Search size={16} className="mr-2 sm:mr-0" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
        <button
          onClick={exportAllToExcel}
          className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
        >
          <Download size={16} className="mr-2" />
          Export All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">
                <div className="flex items-center">
                  Shipment ID
                  <button
                    onClick={toggleSort}
                    className="ml-2 focus:outline-none"
                    aria-label={`Sort by Shipment ID ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </div>
              </th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Shipment from</th>
              <th className="py-3 px-4">Shipment destination</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Document</th>
              <th className="py-3 px-4">Uploaded At</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Export</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((shipment, index) => (
              <tr
                key={shipment.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-3 px-4">{shipment.id}</td>
                <td className="py-3 px-4">
                  {(() => {
                    const link = getStatusLink(shipment.Status, shipment.id);
                    return link ? (
                      <Link href={link} className="text-blue-600 hover:underline">
                        {shipment.Status}
                      </Link>
                    ) : (
                      shipment.Status
                    );
                  })()}
                </td>
                <td className="py-3 px-4">{shipment.Ship_from}</td>
                <td className="py-3 px-4">{shipment.Ship_destination}</td>
                <td className="py-3 px-4">
                  <ul className="list-none p-0 m-0">
                    {shipment.Product?.map((product, idx) => (
                      <li
                        key={idx}
                        className={`p-2 rounded-md ${
                          idx % 2 === 0 ? "bg-white" : "bg-white"
                        } mb-2`}
                      >
                        <div className="font-medium text-gray-800">
                          {product}
                        </div>
                        <div className="text-sm text-gray-600">
                          Capacity: {shipment.Capacity?.[idx] || 0} tons
                        </div>
                        <div className="text-sm text-gray-600">
                          Description:{" "}
                          {shipment.Description?.[idx] ||
                            "No description provided"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4">
                  {shipment.document_url ? (
                    <a
                      href={shipment.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {shipment.document_name || 'View Document'}
                      <FileDown size={16} className="ml-1" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No document</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {shipment.uploaded_at ? (
                    new Date(shipment.uploaded_at).toLocaleDateString()
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-3 px-4">
                  <Link href={`/details/${shipment.id}`} className="text-blue-600 hover:underline">
                    View Shipment Details
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => exportToExcel(shipment)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                  >
                    <FileDown size={16} className="mr-1" />
                    Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div className="mt-4 flex justify-center pb-4">
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
      )}
    </div>
  );
};

export default ShipmentTable;