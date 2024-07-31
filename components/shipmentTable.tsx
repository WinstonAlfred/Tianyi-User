import React from "react";
import { Shipment } from "@prisma/client";

interface Props {
  shipments: Shipment[];
  error: string | null;
}

const ShipmentTable: React.FC<Props> = ({ shipments, error }) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!shipments || shipments.length === 0) {
    return <div>No shipments available.</div>;
  }

  return (
    <div>
      <div className="mb-4"></div>
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
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTable;