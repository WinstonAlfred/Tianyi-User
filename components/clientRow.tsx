import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Detail {
  id: string;
  Loading: string[];
  Unloading: string[];
  Daily_activities: string[];
}

type ActivityType = 'Loading' | 'Unloading' | 'Daily Activities';

interface ClientRowProps {
  detail: Detail;
  index: number;
}

const ClientRow: React.FC<ClientRowProps> = ({ detail, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getItemColor = (type: ActivityType): string => {
    switch(type) {
      case 'Loading':
        return 'bg-white text-black';
      case 'Unloading':
        return 'bg-white text-black';
      case 'Daily Activities':
        return 'bg-white text-black';
      default:
        return 'bg-white text-black';
    }
  };

  const parseActivityString = (str: string): { description: string, items: { datetime: string, work: string }[] } => {
    const lines = str.split('\n');
    const description = lines[0].replace('Description: ', '');
    const items = [];
    for (let i = 1; i < lines.length; i += 2) {
      items.push({
        datetime: lines[i].replace('Datetime: ', ''),
        work: lines[i + 1].replace('Work: ', '')
      });
    }
    return { description, items };
  };

  const renderFormattedText = (items: string[], type: ActivityType): JSX.Element => {
    return (
      <div className={`space-y-4 ${isExpanded ? '' : 'max-h-20 overflow-hidden'}`}>
        {items.map((text, index) => {
          const { description, items } = parseActivityString(text);
          return (
            <div key={index} className={`${getItemColor(type)} p-4 rounded overflow-x-auto`}>
              <h4 className="font-bold mb-2">{description}</h4>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b last:border-b-0">
                        <td className="py-2 pr-4 whitespace-nowrap font-medium">{item.datetime}</td>
                        <td className="py-2 whitespace-nowrap">{item.work}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([{
      'Detail ID': detail.id,
      'Loading': detail.Loading.join('\n'),
      'Unloading': detail.Unloading.join('\n'),
      'Daily Activities': detail.Daily_activities.join('\n')
    }]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detail");
    XLSX.writeFile(workbook, `Detail_${detail.id}.xlsx`);
  };

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out">
        <td className="py-4 px-4 font-medium text-gray-900 align-top">
          {index}
        </td>
        <td className="py-4 px-4 font-medium text-gray-900 align-top">
          {detail.id}
        </td>
        <td className="py-4 px-4 align-top">
          {renderFormattedText(detail.Loading, 'Loading')}
        </td>
        <td className="py-4 px-4 align-top">
          {renderFormattedText(detail.Unloading, 'Unloading')}
        </td>
        <td className="py-4 px-4 align-top">
          {renderFormattedText(detail.Daily_activities, 'Daily Activities')}
        </td>
        <td className="py-4 px-4 align-top">
          <div className="flex justify-center">
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
            >
              <FileDown size={16} className="mr-1" />
              Export
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={6} className="py-2 px-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                See less
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                See more
              </>
            )}
          </button>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;