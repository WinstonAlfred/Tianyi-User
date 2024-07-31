import { prisma } from "../prisma";
import type { Shipment } from '@prisma/client';

export async function getShipmentById(id: string): Promise<Shipment | null> {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id },
    });
    return shipment;
  } catch (error) {
    console.error(`Error fetching shipment with ID ${id}:`, error);
    throw error;
  }
}