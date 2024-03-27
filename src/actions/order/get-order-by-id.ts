'use server';
import prisma from '@/lib/prisma';
export const getOrderById = async( id: string ) => {
  try {
   
    const order = await prisma.order.findUnique({
      where: { id },    
    });

    if( !order ) throw `${ id } no existe`;
    return {
      ok: true,
      order: order,
    }


  } catch (error) {

    console.log(error);

    return {
      ok: false,
      message: 'Orden no existe'
    }
  }
}
