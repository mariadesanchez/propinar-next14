'use client'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { getOrdersByUser } from '../../actions/order/get-order-by-user';
import { upDateDisebledCommentById } from '../../actions/order/update-disebledComment-by-id';
import { Order } from '@prisma/client';

const renderStars = (rating: string) => {
  const ratingNumber = Number(rating)
  if (ratingNumber <= 0) {
    return null;
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < ratingNumber ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    );
  }
  return stars;
};

export default function OrderList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]); // Estado para mantener un registro de los pedidos seleccionados

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrdersByUser();
        if (result.ok) {
          if (result.orders) {
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
  }, [session]); // Solo actualiza los pedidos cuando la sesión cambia

  const handleCheckboxChange = async (orderId: string) => {
    try {
      // Si el pedido ya está en la lista de pedidos seleccionados, quitarlo, de lo contrario, agregarlo
      if (checkedOrders.includes(orderId)) {
        setCheckedOrders(prevState => prevState.filter(id => id !== orderId));
      } else {
        setCheckedOrders(prevState => [...prevState, orderId]);
      }
      // Llamar a la función para actualizar el estado del comentario deshabilitado
      await upDateDisebledCommentById(orderId);
      // Recargar los pedidos cada vez que se hace clic en un checkbox
      const updatedOrders = await getOrdersByUser();
      if (updatedOrders.ok && updatedOrders.orders) {
        const userOrders = updatedOrders.orders.filter(order => order.userId === session?.user.id);
        setOrders(userOrders);
      }
    } catch (error) {
      console.error('Error updating disabled comment:', error);
    }
  };

  if (!session?.user) {
    return <div></div>;
  }

  return (
    <div className="py-8">
      <h1 className="md:text-4xl font-semibold mb-4">Comentarios y Calificaciones...</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Ocultar</th>
              <th className="border border-gray-200 px-4 py-2">Comentario</th>
              <th className="border border-gray-200 px-4 py-2">Fecha</th>
              <th className="border border-gray-200 px-4 py-2">Calificación</th>
              <th className="border border-gray-200 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter(order => order.isPaid && !order.disabledComment)
              .sort((a, b) => {
                if (!a.paidAt && !b.paidAt) {
                  return 0;
                }
                if (!a.paidAt) {
                  return 1;
                }
                if (!b.paidAt) {
                  return -1;
                }
                return new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime();
              })
              .map((order, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-celeste-marcado'}>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={checkedOrders.includes(order.id)} // Verificar si el pedido está en la lista de pedidos seleccionados
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{order.comentario}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {moment(order.paidAt).format('DD-MM-YYYY')}
                  </td>
                  {order.calificacion &&
                    <td className="border border-gray-200 px-4 py-2 text-center">{renderStars(order.calificacion)}</td>}
                  <td className="border border-gray-200 px-4 py-2 text-center">{order.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

