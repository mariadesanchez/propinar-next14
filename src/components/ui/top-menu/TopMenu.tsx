"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { IoStar} from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import {useUIStore } from "@/store";
import { IoPersonOutline, IoMenuOutline } from 'react-icons/io5';
import {TotalMonth} from '@/components/totalMonth';
import { useSession } from "next-auth/react";
// import UserAuth from '../../../actions/order/get-user-auth'



// import UserAuth from '@/actions/order/get-user-auth';

export const TopMenu = () => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);

  const [loaded, setLoaded] = useState(false);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  // if ( session?.user ) {
  //   redirect('/');
  // }
  useEffect(() => {
    setLoaded(true);
  }, [])
  

  return (
    <nav className="flex px-5 justify-between items-center w-full mt-10">
    {/* Logo */}
    <div>
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold flex items-center`}>
          Propin
          <span> | Ar</span>
        </span>
        <div className="inline-flex">
          <IoStar size={30} color="gold" />
          <IoStar size={30} color="gold" />
          <IoStar size={30} color="gold" />
        </div>
      </Link>
    </div>
  
    {/* <div className="flex items-center font-bold text-2xl">
      {isAuthenticated && <p>{session.user.name}</p>}
    </div> */}
   <div className="flex items-center font-bold text-2xl">
  {isAuthenticated && (
    <div style={{marginLeft: '10px'}}> {/* Ajusta el margen izquierdo según lo necesites */}
      <p className="text-xl">Hola</p>
      <p className="text-2xl" style={{color: 'white'}}> {/* Cambia el color del texto a blanco */}
        {session.user.name.split(' ')[0]}
      </p>
    </div>
  )}
</div>

  
    <div className="flex items-center">
      <TotalMonth />
      <IoPersonOutline size={30} />
      <button
        onClick={openSideMenu}
        className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
      >
        <IoMenuOutline size={30} />
      </button>
    </div>
  </nav>
  
  );
};


