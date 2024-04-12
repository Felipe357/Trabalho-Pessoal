import React from "react";

import type { Metadata } from "next";

import AppProvider from "@/provider/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Terra Viva - Eventos",
  description: "Plataforma de eventos!",
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
