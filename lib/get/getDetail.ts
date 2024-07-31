import { prisma } from "../prisma";
import type { Detail } from '@prisma/client';

export async function getDetailsById(id: string): Promise<Detail | null> {
  try {
    const details = await prisma.detail.findUnique({
      where: { id },
    });
    return details;
  } catch (error) {
    console.error(`Error fetching Details with ID ${id}:`, error);
    throw error;
  }
}