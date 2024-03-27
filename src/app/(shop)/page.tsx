export const revalidate = 60; // 60 segundos

import { PlaceOrder } from './checkout/(checkout)/ui/PlaceOrder';




export default async function Home() {




  return (
    <>
   <p>ESTE ES EL HOME</p>
    <PlaceOrder/>
  </>
  );
}
