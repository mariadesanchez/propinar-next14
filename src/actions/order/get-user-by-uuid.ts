
'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      return user.name;
    } else {
      return null; // Retorna null si no se encuentra el usuario
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

 