'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getTotalMonth } from '@/actions/order/get-total-month';

export const TotalMonth = () => {
  const { data: session } = useSession();
  const [totalMonth, setTotalMonth] = useState<number | null>(null); // Estado para almacenar el total del mes

  useEffect(() => {
    const fetchTotalMonth = async () => {
      try {
        // Verificar si session no es null antes de llamar a getTotalMonth
        if (session && session.user) {
          const total = await getTotalMonth(session.user.id); // Pasar el ID del usuario autenticado
          setTotalMonth(total); // Actualizar el estado con el total del mes
        }
      } catch (error) {
        console.error('Error fetching total for the month:', error);
      }
    };
  
    if (session?.user) {
      fetchTotalMonth();
    }
  }, [session]);
  
  if (!session?.user) {
    return <div>Iniciar Sesión</div>;
  }

  return (
    <div>
      {totalMonth && <div className='text-2xl font-bold'>$ {totalMonth}</div>} {/* Mostramos el total del mes si está disponible */}
    </div>
  );
};


