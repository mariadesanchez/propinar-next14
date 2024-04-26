
'use client'
import { Title } from "@/components";
// import { auth } from "@/auth.config";
import { PlaceOrder } from "@/components";
// Importa useEffect para utilizarlo en lugar de una función asíncrona
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'; 

// import UuIdUrl from "@/actions/order/get-uuid-url";
export default  function PropinPage() {
  const [myUserId, setMyUserId] = useState('');
 
  const pathname = usePathname();

  // Utiliza useEffect para ejecutar la lógica cuando cambia la ruta
  useEffect(() => {
    // Divide la ruta en segmentos usando "/" como separador y obtén el último segmento
    const segments = pathname.split('/');
    const uuidUrl = segments[segments.length - 1];
    // Actualiza el estado con el UUID obtenido
    setMyUserId(uuidUrl);
    
  }, [pathname]); // Se ejecutará cada vez que cambie la ruta

 

  return (
<div className="flex justify-center mx-5 my-[-5px]">
  <div className="bg-white rounded-xl max-w-screen-lg w-full md:max-w-[800px] shadow-xl p-7 mx-2">
    <div className="text-center mb-5">
      <div className="mx-auto w-24 h-24 bg-cover bg-no-repeat rounded-full overflow-hidden" style={{ backgroundImage: `url('/imgs/AvatarLucky.png')` }}></div>
      <p className="font-bold text-xl">Lucky Sanchez</p>
    
      <div className="max-w-screen-lg w-full h-0.5 rounded bg-gray-200 mb-10" />
     
      <div className="mt-5 mb-20 max-w-screen-lg w-full"> {/* Agregado mb-20 */}
      
        {myUserId && <PlaceOrder uuid={myUserId} />}
      </div>
    </div>
  </div>
</div>

  );
}


