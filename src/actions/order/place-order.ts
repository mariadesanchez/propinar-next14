"use server";
import prisma from "@/lib/prisma";
export const placeOrder = async (
  total: number,
) => {
 
  try {

    const prismaTx = await prisma.$transaction(async (tx) => {
 
      const order = await tx.order.create({
        data: {
        
          total: total,

        },
      });


      return {
     
        order: order,
     
      };
    });


    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    }


  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};