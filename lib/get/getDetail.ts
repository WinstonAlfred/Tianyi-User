import { prisma } from "../prisma";
import type { Detail } from '@prisma/client';

export async function getDetailById(id: string): Promise<Detail | null> {
  try {
    console.log(`Fetching detail with ID: ${id}`);
    const detail = await prisma.detail.findUnique({
      where: { id },
    });
    console.log('Fetched detail:', detail);
    return detail;
  } catch (error) {
    console.error(`Error fetching Detail with ID ${id}:`, error);
    throw error;
  }
}