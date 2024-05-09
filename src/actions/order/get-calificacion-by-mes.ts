'use server'
import prisma from '@/lib/prisma';

export const getCalificacionByMes = async (startDate: Date, endDate: Date) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        paidAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calcular el promedio de las calificaciones
    const totalCalificaciones = orders.reduce((total, order) => {
      // Convertir calificacion a número y sumarla al total
      return total + Number(order.calificacion);
    }, 0);
    
    const promedio = totalCalificaciones / orders.length;

    return {
      ok: true,
      promedioCalificaciones: promedio,
    };
  } catch (error) {
    console.error('Error al obtener las calificaciones:', error);
    return {
      ok: false,
      error: 'Error al obtener las calificaciones',
    };
  }
};
