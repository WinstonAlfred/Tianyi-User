import React from 'react'
import ShipmentTable from '@/components/shipmentTable';
import { prisma } from "@/lib/prisma"
import type { Shipment } from '@prisma/client'


export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getShipments(): Promise<{ shipments: Shipment[]; error: string | null }> {
  try {
    const shipments = await prisma.shipment.findMany();
    return { shipments, error: null };
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return { 
      shipments: [], 
      error: "Failed to fetch shipments. Please try again later." 
    };
  }
}

export default async function ShipmentPage() {
  const { shipments, error } = await getShipments();

  return (
    <div>
      <ShipmentTable shipments={shipments} error={error} />
    </div>
  )
}