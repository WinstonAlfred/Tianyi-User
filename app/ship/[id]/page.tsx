import React from 'react';
import { getShipById } from '@/lib/get/getShip';
import { prisma } from '@/lib/prisma';
import type { Ship, Shipment } from '@prisma/client';
import ShipDetailsClient from './ShipDetailsClient';

interface Props {
  ship: Ship | null;
  shipments: Shipment[];
  error?: string;
}

export async function generateStaticParams() {
  const ships = await prisma.ship.findMany({
    take: 100, // Limit to the most recent 100 ships
  });
  return ships.map((ship) => ({
    id: ship.id,
  }));
}

async function getShipData(id: string): Promise<Props> {
  try {
    const ship = await getShipById(id);
    if (!ship) {
      return { ship: null, shipments: [], error: 'Ship not found' };
    }

    const shipments = await prisma.shipment.findMany({
      where: {
        id: {
          contains: id,
        },
      },
    });

    return { ship, shipments };
  } catch (error) {
    console.error('Error fetching ship data:', error);
    return { ship: null, shipments: [], error: 'Error fetching ship data' };
  }
}

export default async function ShipDetailsPage({ params }: { params: { id: string } }) {
  const { ship, shipments, error } = await getShipData(params.id);

  return (
    <ShipDetailsClient
      ship={ship}
      shipments={shipments}
      error={error}
    />
  );
}

// Add ISR configuration
export const revalidate = 10; // Revalidate every 10 seconds