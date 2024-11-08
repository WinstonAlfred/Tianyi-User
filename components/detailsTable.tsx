'use client'

import React, { useState } from "react";
import ClientRow from "./clientRow";
import { ArrowUpDown, FileDown, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

// Update this interface to match your Prisma schema
interface Detail {
  id: string;
  Queue: string[];
  Loading: string[];
  Unloading: string[];
  Sailing_report: string[];
}

interface Props {
  details: Detail[];
  error: string | null;
}

const DetailsTable: React.FC<Props> = ({ details, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!details || details.length === 0) {
    return <div>No details available.</div>;
  }

  const filteredDetails = details
    .filter((detail) =>
      detail.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.id.localeCompare(b.id);
      } else {
        return b.id.localeCompare(a.id);
      }
    });

  const pageCount = Math.ceil(filteredDetails.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const exportAllToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      filteredDetails.map(detail => ({
        'Detail ID': detail.id,
        'Queue': detail.Queue.join('\n'),
        'Loading': detail.Loading.join('\n'),
        'Unloading': detail.Unloading.join('\n'),
        'Sailing Report': detail.Sailing_report.join('\n')
      }))
    );
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Details");
    XLSX.writeFile(workbook, `All_Details.xlsx`);
  };

  const exportSingleToExcel = (detail: Detail) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([{
      'Detail ID': detail.id,
      'Queue': detail.Queue.join('\n'),
      'Loading': detail.Loading.join('\n'),
      'Unloading': detail.Unloading.join('\n'),
      'Sailing Report': detail.Sailing_report.join('\n')
    }]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detail");
    XLSX.writeFile(workbook, `Detail_${detail.id}.xlsx`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-full">
      <div className="bg-gray-200 p-4 rounded-md mb-4 text-lg font-bold">SHIPMENT DETAILS TABLE</div>
      <div className="mb-4 px-4 flex flex-col sm:flex-row gap-2">
        <div className="flex flex-grow">
          <input
            type="text"
            placeholder="Search by Detail ID"
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
          <FileDown size={16} className="mr-2" />
          Export All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">
                <div className="flex items-center">
                  Detail ID
                  <button
                    onClick={toggleSort}
                    className="ml-2 focus:outline-none"
                    aria-label={`Sort by Detail ID ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </div>
              </th>
              <th className="py-3 px-4">Queue</th>
              <th className="py-3 px-4">Loading</th>
              <th className="py-3 px-4">Unloading</th>
              <th className="py-3 px-4">Sailing Report</th>
              <th className="py-3 px-4">Export</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((detail, index) => (
              <ClientRow 
                key={detail.id}
                detail={detail} 
                index={(currentPage - 1) * itemsPerPage + index + 1}
                onExport={() => exportSingleToExcel(detail)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div className="mt-4 flex justify-center pb-4 overflow-x-auto">
          <div className="flex">
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
};

export default DetailsTable;