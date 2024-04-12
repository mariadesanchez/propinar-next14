import { Footer, Sidebar, TopMenu } from '@/components';
import type { Metadata } from "next";
import { auth } from "@/auth.config";

// import "./globals.css";


export const metadata: Metadata = {
  title: {
    template: "%s - Propin | Ar",
    
    default: "Home - Propin | Ar",
  },
  description: "Una tienda virtual de productos",
};

export default function ShopLayout( { children }: {
  children: React.ReactNode;
  
} ) {
  return (
    
    <main className="min-h-screen">

      <TopMenu />
      <Sidebar />

      <div className="px-0 sm:px-10 mb-10">
        { children }

      </div>

      <Footer />
    </main>
  );
}