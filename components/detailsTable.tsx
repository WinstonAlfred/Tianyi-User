import { Detail } from '@prisma/client';
import React from 'react';
import ClientRow from './clientRow'; // Assuming ClientRow is in the same directory

async function getDetailData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/details`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch detail data');
  }
  return res.json();
}

const DetailsTable = async () => {
  const details = await getDetailData();

  return (  
    <div>
      <div className="mb-4">
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 md:text-sm">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4">#</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Detail ID</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Loading</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Unloading</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Daily Activities</th>
              <th className="py-2 px-2 md:py-3 md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail: Detail, index: number) => (
              <ClientRow key={detail.id} detail={detail} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;