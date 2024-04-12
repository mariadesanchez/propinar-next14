import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
    className={clsx(
      "flex items-center justify-center rounded-lg py-2 px-3.5 text-xs text-white mb-5",
      {
        "bg-red-500": !isPaid,
        "bg-blue-500": isPaid,
      }
    )}
  >
    <IoCardOutline size={30} className="font-bold" />
    {/* <span className="mx-2">Pendiente de pago</span> */}
    <span className="mx-2 font-bold">{isPaid ? "Pagada" : "No pagada"}</span>
  </div>
  
  );
};

//IoTrashOutline