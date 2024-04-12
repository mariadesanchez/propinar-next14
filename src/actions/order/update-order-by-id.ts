'use server';

import prisma from '@/lib/prisma';
// import { redirect } from 'next/navigation';


export const upDateOrderById = async (
  id: string,
  comentario?: string, // Hacer el campo comentario opcional
  calificacion?: string, // Hacer el campo calificacion opcional
  client?: string, // Hacer el campo client opcional
  collectionId?:string
) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw `${id} no existe`;
    }
    // if (order.comentario) {
    //   throw `${id} Ya dejaste un comentario`;
    // }
    // if (order.calificacion) {
    //   throw `${id} Ya dejaste una Calificación`;
    // }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        comentario: comentario,
        calificacion: calificacion,
        client: client,
      },
    });

    //   redirect('/');
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Información no existe',
    };
  }
};
