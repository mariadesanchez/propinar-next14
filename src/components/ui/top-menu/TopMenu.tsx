"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { IoStar} from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import {useUIStore } from "@/store";
import { IoPersonOutline, IoMenuOutline } from 'react-icons/io5';
import {TotalMonth} from '@/components/totalMonth';



// import UserAuth from '@/actions/order/get-user-auth';

export const TopMenu = () => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);

  const [loaded, setLoaded] = useState(false);



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
            <span> | Ar</span>  </span>
            <div className="inline-flex">
              <IoStar size={30} color="gold" />
              <IoStar size={30} color="gold" />
              <IoStar size={30} color="gold" />
            </div>
         
      
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        {/* <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link> */}
       
        <div className="flex items-center">
   
        <TotalMonth/>
          <IoPersonOutline size={30} />
        {/* {UserAuth()} */}
      

        </div>
        
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


