'use client'

import React, { useState } from "react";
import { Detail } from "@prisma/client";
import ClientRow from "./clientRow";

interface Props {
  details: Detail[];
  error: string | null;
}

const DetailsTable: React.FC<Props> = ({ details, error }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!details || details.length === 0) {
    return <div>No details available.</div>;
  }

  const filteredDetails = details.filter((detail) =>
    detail.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-4 rounded-md mb-4 text-lg font-bold">SHIPMENT DETAILS TABLE</div>
      <div className="mb-4 px-4 flex">
        <input
          type="text"
          placeholder="Search by Detail ID"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {/* Implement search functionality */}}
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Detail ID</th>
              <th className="py-3 px-4">Loading</th>
              <th className="py-3 px-4">Unloading</th>
              <th className="py-3 px-4">Daily Activities</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail, index) => (
              <ClientRow key={detail.id} detail={detail} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;