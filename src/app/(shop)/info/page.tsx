'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getOrdersByUser } from '../../../actions/order/get-orders-by-user';
// import { getTotalMonth } from '@/actions/order/get-total-month';
import moment from 'moment';
const renderStars = (rating: number) => {
  if (rating <= 0) {
    return null;
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    );
  }
  return stars;
};

export default function OrderList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [totalMonth, setTotalMonth] = useState<number | null>(null); // Estado para almacenar el total del mes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrdersByUser();
        if (result.ok) {
          // Verificar si result.orders es undefined
          if (result.orders) {
            // Filtrar órdenes asociadas al usuario autenticado
            const userOrders = result.orders.filter(order => order.userId === session?.user.id);
            setOrders(userOrders);
          } else {
            console.error('No se encontraron órdenes para el usuario.');
          }
        } else {
          console.error('Error fetching orders:', result.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session]);


  
  if (!session?.user) {
    return <div>No hay sesión activa</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4">Comentarios y Calificaciones...</h1>
      {/* {totalMonth && <div>Total del mes: {totalMonth}</div>} Mostramos el total del mes si está disponible */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Comentario</th>
              <th className="border border-gray-200 px-4 py-2">Fecha</th>
              <th className="border border-gray-200 px-4 py-2">Hora</th>
              <th className="border border-gray-200 px-4 py-2">Calificación</th>
              <th className="border border-gray-200 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
  {orders
    .filter(order => order.isPaid) // Filtrar las órdenes donde isPaid sea true
    .map((order, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-celeste-marcado'}>
      <td className="border border-gray-200 px-4 py-2 text-center">{order.comentario}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{moment(order.paidAt).format('DD-MM-YYYY')}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{moment(order.paidAt).format('HH:mm:ss')}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{renderStars(order.calificacion)}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{order.total}</td>
    </tr>
    ))}
</tbody>
        </table>
      </div>
    </div>
  );
}
