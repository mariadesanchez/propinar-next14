
'use client'
// Importa useEffect para utilizarlo en lugar de una función asíncrona
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'; // Importar desde next/navigation en lugar de next/router

export default function UuIdUrl() {
  // Define el estado para almacenar el UUID
  const [myUserId, setMyUserId] = useState('');
  
  // Obtiene la ruta actual
  const pathname = usePathname();

  // Utiliza useEffect para ejecutar la lógica cuando cambia la ruta
  useEffect(() => {
    // Divide la ruta en segmentos usando "/" como separador y obtén el último segmento
    const segments = pathname.split('/');
    const uuidUrl = segments[segments.length - 1];
    // Actualiza el estado con el UUID obtenido
    setMyUserId(uuidUrl);
  }, [pathname]); // Se ejecutará cada vez que cambie la ruta

  // Retorna el UUID
  return myUserId;
}
