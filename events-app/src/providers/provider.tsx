"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { NextAuthProvider } from "./client.providers/nextauth.client.provider";
import SessionProvider from "./client.providers/session.client.provider";
import EventosProvider from "./client.providers/evento.client.provider";

const AppProvider = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  return (
    <NextUIProvider className="provider">
      <NextAuthProvider>
        <SessionProvider>
          <EventosProvider>{children}</EventosProvider>
        </SessionProvider>
      </NextAuthProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
