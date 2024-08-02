'use client'

import React, { useState } from "react";
import { Shipment } from "@prisma/client";
import Link from "next/link";

interface Props {
  shipments: Shipment[];
  error: string | null;
}

const ShipmentTable: React.FC<Props> = ({ shipments, error }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!shipments || shipments.length === 0) {
    return <div>No shipments available.</div>;
  }

  const filteredShipments = shipments.filter((shipment) =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-md mb-4 text-lg font-bold">SHIPMENT TABLE</div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by Shipment ID"
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
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Shipment ID</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Shipment from</th>
              <th className="py-3 px-4">Shipment destination</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment, index) => (
              <tr
                key={shipment.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-3 px-4">{shipment.id}</td>
                <td className="py-3 px-4">{shipment.Status}</td>
                <td className="py-3 px-4">{shipment.Ship_from}</td>
                <td className="py-3 px-4">{shipment.Ship_destination}</td>
                <td className="py-3 px-4">
                  <ul className="list-none p-0 m-0">
                    {shipment.Product?.map((product, idx) => (
                      <li
                        key={idx}
                        className={`p-2 rounded-md ${
                          idx % 2 === 0 ? "bg-blue-50" : "bg-green-50"
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
                  <Link href={`/details/${shipment.id}`} className="text-blue-600 hover:underline">
                    View Shipment Details
                  </Link>
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