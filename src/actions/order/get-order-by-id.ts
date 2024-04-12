'use server';

// import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getOrderById = async( id: string ) => {

  // const session = await auth();

  // if ( !session?.user ) {
  //   return {
  //     ok: false,
  //     message: 'Debe de estar autenticado'
  //   }
  // }


  try {
    
    const order = await prisma.order.findUnique({
      where: { id },
     
    });



    if( !order ) throw `${ id } no existe`;

    // if ( session.user.role === 'user' ) {
    //   if ( session.user.id !== order.userId ) {
    //     throw `${ id } no es de ese usuario`
    //   }
    // }



    return {
      ok: true,
      order: order,
    }


  } catch (error) {

    console.log(error);

    return {
      ok: false,
      message: 'Información no existe'
    }


  }




}
