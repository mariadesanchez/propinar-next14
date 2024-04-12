import React from "react";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 sm:px-0">
      {/* QRCode dentro del div */}
      <div className="flex flex-col items-end mr-8"> {/* Aplicamos estilos de alineación a la derecha */}
      </div>

      {/* Checkout - Resumen de orden */}
      <div className="flex justify-center">
        {/* Centro el componente PlaceOrder horizontalmente */}
        <PlaceOrder />
      </div>
    </div>
  );
}


