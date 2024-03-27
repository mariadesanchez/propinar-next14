'use server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';


interface Order {
  id: string;
  total: number;
}

export const mercadoPagoCheckPayment = async (order: Order) => {
  const accessToken = process.env.NEXT_MERCADO_PAGO_ACCESS_TOKEN!;
  
  const client = new MercadoPagoConfig({ accessToken });

  const preference = new Preference(client);

  const res = await preference.create({
    body: {
      external_reference: order?.id,
      items: [
        {
          id: order?.id,
          title: `Order #${order?.id.split("-").at(-1)}`,
          quantity: 1,
          unit_price: order.total,
        },
      ],
      redirect_urls: {
        // failure: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
        // success:`https://lucky-shop-next14.vercel.app/orders/${ order.id }`,

        failure: `http://localhost:3001/orders/${ order.id }`,
        success:`http://localhost:3001/${ order.id }`,
      },
      back_urls: {
        failure: `http://localhost:3001/orders/${ order.id }`,
        success:`http://localhost:3001/orders/${ order.id }`,
        // failure: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
        // success: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
        

      },
      auto_return: 'approved',
    },
  });

  // Actualiza la orden como pagada en la base de datos
  await prisma.order.update({
    where: { id: order.id },
    data:  {
      isPaid: true,
      paidAt: new Date()
    }
  });

  // Redirige al usuario después de que Mercado Pago haya cobrado y la orden haya sido actualizada
  redirect(res.init_point!); 
};
