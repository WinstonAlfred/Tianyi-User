import React from 'react'
import DetailsTable from '@/components/detailsTable';
import { prisma } from "@/lib/prisma"
import type { Detail } from '@prisma/client'

async function getDetails(): Promise<{ details: Detail[]; error: string | null }> {
  try {
    const details = await prisma.detail.findMany();
    return { details, error: null };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { 
      details: [], 
      error: "Failed to fetch details. Please try again later." 
    };
  }
}

export default async function DetailsPage() {
  const { details, error } = await getDetails();

  return (
    <div>
      <DetailsTable details={details} error={error} />
    </div>
  )
}