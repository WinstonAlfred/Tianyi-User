import React from "react";
import { Detail } from "@prisma/client";
import ClientRow from "./clientRow";

interface Props {
  details: Detail[];
  error: string | null;
}

const DetailsTable: React.FC<Props> = ({ details, error }) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!details || details.length === 0) {
    return <div>No details available.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
            {details.map((detail, index) => (
              <ClientRow key={detail.id} detail={detail} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;