// lib/get/getDetails.ts
export async function getDetails() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/details`);
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching details:', error);
      throw error;
    }
  }
  
  export async function getDetailsById(id: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/details/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch detail with ID ${id}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching detail with ID ${id}:`, error);
      throw error;
    }
  }