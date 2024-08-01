import React from 'react'
import ShipTable from '@/components/shipTable'
import { prisma } from "@/lib/prisma"
import type { Ship } from '@prisma/client'



export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getShips(): Promise<{ ships: Ship[] | null; error: string | null }> {
  try {
    const ships = await prisma.ship.findMany();
    return { ships, error: null };
  } catch (error) {
    console.error("Error fetching ships:", error);
    return { 
      ships: null, 
      error: "Failed to fetch ships. Please try again later." 
    };
  }
}

export default async function ShipPage() {
  const { ships, error } = await getShips();

  return (
    <div>
      <ShipTable ships={ships} error={error} />
    </div>
  )
}