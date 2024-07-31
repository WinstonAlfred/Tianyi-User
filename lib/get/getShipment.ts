// lib/get/getShipments.ts
export async function getShipments() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments`);
    if (!response.ok) {
      throw new Error('Failed to fetch shipments');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching shipments:', error);
    throw error;
  }
}

export async function getShipmentsById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shipment with ID ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching shipment with ID ${id}:`, error);
    throw error;
  }
}