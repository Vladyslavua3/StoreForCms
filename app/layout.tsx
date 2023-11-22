import React from "react";
import Footer from "@/components/footer";
import {Urbanist} from "next/font/google";
import './globals.css'
import Navbar from "@/components/navbar";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";

const font = Urbanist({subsets:['latin']})

export const metadata = {
  title: 'Moe',
  description: 'Women clothes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <ToastProvider />
      <ModalProvider />
      <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  )
}
