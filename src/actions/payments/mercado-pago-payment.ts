'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect} from 'next/navigation'; // Importar desde next/navigation en lugar de next/router
import prisma from '@/lib/prisma';

interface Order {
  id: string;
  total: number;
  orderUserId:string
}

export const mercadoPagoCheckPayment = async (order: Order) => {

   //elimina espacios en blanco inicial, elimina numeros iniciales (en vercel tiene que comenzar con una letra una variable de entorno)
  //tambien reemplazamos los - por _ que son los que acepta vercel para variables de entorno
   //el resultado de modificar el uuid del usuario, ej:c538e983_a9ac_4e74_a045_58c174fb73c6, es el nombre de la variable de entorno
   //que usaremos en .env para ese usuario(camarero/a), cuyo valor el access-token de Mercado Pago
  const modifiedUserId = order.orderUserId.replace(/-/g, '_').replace(/^\d+/, '').trim().toLowerCase();
   console.log(modifiedUserId)
   // Acceder a la variable de entorno modificada
   const accessToken = process.env[modifiedUserId];

  if (!accessToken) {
    console.error("No se pudo obtener el token de acceso para el usuario:", modifiedUserId);
    return; // Salir de la función si no se puede obtener el token de acceso
  } // Acceder a la variable de entorno basada en orderUserId

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
      // redirect_urls: {
      //   failure: `https://propinar-arg.vercel.app/orders/${order.id}`,
      //   success: `https://propinar-arg.vercel.app/orders/${order.id}`,
      // },
      // back_urls: {
      //   failure: `https://propinar-arg.vercel.app/orders/${order.id}`,
      //   success: `https://propinar-arg.vercel.app/orders/${order.id}`,
      // },
      redirect_urls: {
        failure: `http://localhost:3000/orders/${order.id}`,
        success: `http://localhost:3000/orders/${order.id}`,
      },
      back_urls: {
        failure: `http://localhost:3000/orders/${order.id}`,
        success: `http://localhost:3000/orders/${order.id}`,
      },
      auto_return: 'approved'
    },
  });

  if (res.id) {

    
    // Utiliza redirect desde next/navigation para redirigir después de actualizar la orden
    redirect(res.init_point!);
  } else {
    console.error("No se pudo obtener el payment_id de la respuesta de Mercado Pago.");
  }
};