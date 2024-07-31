import { prisma } from "../prisma";
import type { Ship } from "@prisma/client";

export async function getShipById (id: string): Promise<Ship | null> {
    try {
        const ship = await prisma.ship.findUnique({
            where:{ id },
            });
            return ship;
    } catch (error) {
        console.error('Error fetching Ships with ID ${id}:', error);
        throw error;
    }
}