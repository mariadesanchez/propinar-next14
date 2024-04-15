

'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
// import { redirect } from 'next/navigation';


export const upDateOrderIsPaid = async (
  id: string,
 
) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw `${id} no existe`;
    }
    


    await prisma.order.update({
      where: { id: order.id },
      data: {
              isPaid: true,
              paidAt: new Date(),
            }
    });

    //   redirect('/rating');
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Información no existe',
    };
  }
};