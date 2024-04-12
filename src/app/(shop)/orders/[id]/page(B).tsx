
import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utils";
import { OrderStatus } from "../../../../components/orders/OrderStatus";
import { MercadoPagoButton } from "@/components/mercadoPago/MercadoPagoButton";
import { Title } from "@/components";
import {Rating} from "@/components";


interface Props {
  params: {
    id: string;
 
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;


  // Todo: Llamar el server action

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }
 

  return (
    <div className="flex justify-center mb-72 sm:px-0">
  <div className="bg-white rounded-xl max-w-screen-lg w-full md:max-w-[800px] shadow-xl p-7 mt-20">    <div className="bg-white rounded-xl shadow-xl p-7 relative">
      <div className="text-center">
        <div className="mx-auto mt-[30px] w-24 h-24 bg-cover bg-no-repeat rounded-full overflow-hidden" style={{ backgroundImage: `url('/imgs/AvatarLucky.png')` }}>
        </div>
        <p className="font-bold text-xl">Lucky Sanchez</p>
        <Title title="PropinAr" className="inline-block" />
      </div>
      <p className="text-xl text-center">
        <span className="text-2xl text-center">🇦🇷</span> Propina Electrónica Argentina{' '}
        <span className="text-2xl text-center">🇦🇷</span>
      </p>
      <div className="max-w-screen-lg w-full h-0.5 rounded bg-gray-200 mb-10" />
      <span className="mt-5 text-2xl text-center font-bold">
        <div className="flex justify-center">{currencyFormat(order!.total)}</div>
      </span>
      <div className="mt-5 mb-2 max-w-screen-lg w-full">
        {order?.isPaid ? (
          <>
            <OrderStatus isPaid={order?.isPaid ?? false} />
            <Rating orderId={order!.id} />
          </>
        ) : (
          <MercadoPagoButton orderTotal={order!.total} orderId={order!.id} />
        )}
      </div>
    </div>
  </div>
</div>


  );
  

  
  
}


