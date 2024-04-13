
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
    <div className="flex justify-center mx-5 my-2">
  <div className="bg-white rounded-xl max-w-screen-lg w-full md:max-w-[800px] shadow-xl p-7 mx-2">
    <div className="text-center ">
    <div className="mx-auto  w-24 h-24 bg-cover bg-no-repeat rounded-full overflow-hidden" style={{ backgroundImage: `url('/imgs/AvatarLucky.png')` }}>

    </div>
    <p className="font-bold text-xl">Lucky Sanchez</p>
      <Title title="PropinAr" className="inline-block " />
  
      <p className="text-xl text-center">
      <span className="text-2xl text-center mb-5">🇦🇷</span> Propina Electrónica Argentina 
      <span className="text-2xl text-center mb-5">🇦🇷</span>
    </p>
    <div className="max-w-screen-lg w-full h-0.5 rounded bg-gray-200 " />
      <span className=" text-2xl text-center font-bold">
        <div className="flex justify-center">{currencyFormat(order!.total)}</div>
      </span>
      <div className="max-w-screen-lg w-full">
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
};
