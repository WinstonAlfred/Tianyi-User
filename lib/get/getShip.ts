// lib/get/getShip.ts
export async function getShip() {
    try {
      const response = await fetch('/api/ship');
      if (!response.ok) {
        throw new Error('Failed to fetch ships');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching ships:', error);
      throw error;
    }
  }
  
  export async function getShipById(id: string) {
    try {
      const response = await fetch(`/api/ship/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ship with ID ${id}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching ship with ID ${id}:`, error);
      throw error;
    }
  }