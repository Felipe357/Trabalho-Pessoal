import React from "react";

import type { Metadata } from "next";

import AppProvider from "@/provider/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Terra Viva - Vendas",
  description: "Plataforma de vendas!",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta content="upgrade-insecure-requests" />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
