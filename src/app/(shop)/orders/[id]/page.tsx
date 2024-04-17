'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getOrderById, upDateOrderIsPaid } from "@/actions";
import { currencyFormat } from "@/utils";
import { MercadoPagoButton } from "@/components/mercadoPago/MercadoPagoButton";
import { Rating, Title } from "@/components";

interface Order {
  id: string;
  total: number;
  comentario: string | null;
  calificacion: string | null;
  client: string | null;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactionId: string | null;
}

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCollectionStatusApproved, setIsCollectionStatusApproved] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { ok, order } = await getOrderById(id);
      if (!ok || !order) {
        redirect("/");
      } else {
        setOrder(order);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (order && !loading) {
      const queryParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const isApproved = queryParams && queryParams.has("collection_status") && queryParams.get("collection_status") === "approved";
      if (isApproved !== null) {
        setIsCollectionStatusApproved(isApproved);
      }
      if (isApproved && !order.isPaid) {
        upDateOrderIsPaid(order.id);
      }
    }
  }, [order, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center mx-5 my-[-5px]">
      <div className="bg-white rounded-xl max-w-screen-lg w-full md:max-w-[800px] shadow-xl p-7 mx-2">
        <div className="text-center mb-5">
          <div className="mx-auto w-24 h-24 bg-cover bg-no-repeat rounded-full overflow-hidden" style={{ backgroundImage: `url('/imgs/AvatarLucky.png')` }}></div>
          <p className="font-bold text-xl">Lucky Sanchez</p>
          <Title title="PropinAr" className="inline-block " />
          <p className="text-xl text-center">
            <span className="text-2xl text-center">🇦🇷</span> Propina Electrónica Argentina <span className="text-2xl text-center">🇦🇷</span>
          </p>
          <div className="max-w-screen-lg w-full h-0.5 rounded bg-gray-200 mb-10" />
          <span className="mt-5 text-2xl text-center font-bold">
            <div className="flex justify-center">{currencyFormat(order!.total)}</div>
          </span>
          <div className="mt-5 mb-2 max-w-screen-lg w-full">
            {isCollectionStatusApproved ? (
              <Rating orderId={order!.id} />
            ) : (
              <MercadoPagoButton orderTotal={order!.total} orderId={order!.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
