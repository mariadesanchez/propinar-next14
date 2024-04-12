import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - PropinAr",
    default: "Home - PropinAr",
  },
  description: "Propina Electrónica Argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#75AADB' }}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

