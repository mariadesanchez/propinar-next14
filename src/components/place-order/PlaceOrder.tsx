"use client";
// PlaceOrder.tsx

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { placeOrder } from '@/actions';
import { currencyFormat } from '@/utils';
import { Title } from "@/components/ui/title/Title";
import { QRCodeGenerator } from "@/components/qr-generator/QRCodeGenerator";
import { UserName } from "../user-name/UserName";

interface Props {
    uuid: string;
}

export const PlaceOrder = ({ uuid }: Props) => {
  const router = useRouter();
  const [loaded, setLoaded] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);
  const [total, setTotal] = React.useState(1);
 

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
  
    try {
      const userId = uuid;
    

      const resp = await placeOrder(total, userId);

      if (!resp.ok) {
        setIsPlacingOrder(false);
        setErrorMessage(resp.message);
        return;
      }
    
      router.replace('/orders/' + resp.order?.id);

    } catch (error) {
      setIsPlacingOrder(false);
      setErrorMessage('An error occurred while placing the order.');
    }
  };
  
  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex justify-center mx-5 my-[-70px]">
      <div className="bg-white rounded-xl max-w-screen-lg w-full md:max-w-[800px] shadow-xl p-7 mt-20">
        <div className="text-center mt-[-70px] font-bold text-2xl">
          <UserName userId={uuid}/>
          <div className="text-center  mt-5">
          <QRCodeGenerator defaultUrl={`https://propinar-arg.vercel.app/propin/${uuid}`} size={60} />
          </div>
          <Title title="PropinAr" className="inline-block " />
        </div>
        <p className="text-xl text-center">
          <span className="text-2xl text-center mb-5">🇦🇷</span> Propina Electrónica Argentina 
          <span className="text-2xl text-center mb-5">🇦🇷</span>
        </p>
        <div className="max-w-screen-lg w-full h-0.5 rounded bg-gray-200 " />
        <span className="mt-5 text-2xl text-center font-bold ">
          <div className="flex justify-center">{currencyFormat(total)}</div>
        </span>
        <div className="mt-5  max-w-screen-lg w-full">
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(parseFloat(e.target.value))}
            style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
            className="w-full md:w-[calc(100% - 80px)] border border-gray-500 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            placeholder="Enter Total"
            required
            min="1"
          />
          <p className="mb-5"></p>
          <p className="text-red-500">{errorMessage}</p>
          <button
            onClick={onPlaceOrder}
            className={clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder,
              'w-full md:w-[calc(100% - 80px)]': true,
              'mt':'20px'
            })}
          >
            Propina
          </button>
        </div>
      </div>
    </div>
  );
}
