'use client'

import React, { useState } from 'react';
import LoadingTimeline from './loadingTimeline';
import QueueTimeline from './queueTimeline';
import SailingReportTimeline from './sailReportTimeline';
import UnloadingTimeline from './unloadingTimeline';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FinishedTimelineProps {
  shipmentId: string;
  loadingData: string[];
  queueData: any; // Replace 'any' with the correct type for queueData
  sailingReportData: string[]; // Updated to match the component's prop name
  unloadingData: any; // Replace 'any' with the correct type for unloadingData
}

const FinishedTimeline: React.FC<FinishedTimelineProps> = ({
  shipmentId,
  loadingData,
  queueData,
  sailingReportData,
  unloadingData
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const renderSection = (title: string, component: React.ReactNode) => {
    const isExpanded = expandedSections.includes(title);
    return (
      <div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
        <div
          className="bg-gray-100 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection(title)}
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
        {isExpanded && (
          <div className="p-4">
            {component}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Complete Timeline for Shipment {shipmentId}
      </h1>
      {renderSection("Loading", <LoadingTimeline loadingData={loadingData} shipmentId={shipmentId} />)}
      {renderSection("Queue", <QueueTimeline queueData={queueData} shipmentId={shipmentId} />)}
      {renderSection("Sailing Report", <SailingReportTimeline sailingReportData={sailingReportData} shipmentId={shipmentId} />)}
      {renderSection("Unloading", <UnloadingTimeline unloadingData={unloadingData} shipmentId={shipmentId} />)}
    </div>
  );
};

export default FinishedTimeline;