'use server'
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const getTotalMonth = async (userId: string): Promise<number> => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const where: Prisma.OrderWhereInput = {
    AND: [
      { paidAt: { gte: firstDayOfMonth } },
      { paidAt: { lte: lastDayOfMonth } },
      { userId: userId }, // Filtrar por userId
      { isPaid: true } // Filtrar por isPaid true
    ]
  };

  const totalOrdersThisMonth = await prisma.order.aggregate({
    _sum: {
      total: true
    },
    where
  });

  return totalOrdersThisMonth._sum?.total ?? 0;
};

