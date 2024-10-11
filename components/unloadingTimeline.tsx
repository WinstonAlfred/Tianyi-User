'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface UnloadingTimelineProps {
  unloadingData: string[];
  shipmentId: string;
}

const UnloadingTimeline: React.FC<UnloadingTimelineProps> = ({ unloadingData, shipmentId }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const parseActivityString = (str: string): { description: string[], items: { datetime: string, work: string }[] } => {
    const lines = str.split('\n');
    let description = [];
    let items = [];
    let isDescription = true;

    for (let i = 0; i < lines.length; i++) {
      if (isDescription) {
        if (lines[i].startsWith('Datetime:')) {
          isDescription = false;
          i--; // Reprocess this line as an item
        } else {
          description.push(lines[i]);
        }
      } else {
        if (i + 1 < lines.length) {
          items.push({
            datetime: lines[i].replace('Datetime: ', ''),
            work: lines[i + 1].replace('Work: ', '')
          });
          i++; // Skip the next line as we've already processed it
        }
      }
    }

    return { description, items };
  };

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Unloading Timeline for Shipment {shipmentId}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          {unloadingData.map((item, index) => {
            const { description, items } = parseActivityString(item);
            const isExpanded = expandedItems.includes(index);

            return (
              <div key={index} className="mb-6 border-b pb-4">
                {description.length > 0 && (
                  <div className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">
                    {description.map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                )}
                <div className="relative pl-6 sm:pl-8">
                  {items.slice(0, isExpanded ? items.length : 1).map((subItem, subIndex) => (
                    <div key={subIndex} className="mb-4 relative">
                      <div className="absolute left-0 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 sm:border-4 border-white z-10"></div>
                      {subIndex < items.length - 1 && (
                        <div className="absolute left-1.5 sm:left-2 top-5 bottom-0 w-0.5 bg-blue-200"></div>
                      )}
                      <div className="pl-6 sm:pl-8">
                        <p className="font-semibold text-sm sm:text-base">{subItem.datetime}</p>
                        <p className="text-gray-600 text-sm sm:text-base mt-1">{subItem.work}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-2 text-blue-500 hover:text-blue-700 text-sm flex items-center"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} className="mr-1" />
                        See less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-1" />
                        See more ({items.length - 1} more items)
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnloadingTimeline;