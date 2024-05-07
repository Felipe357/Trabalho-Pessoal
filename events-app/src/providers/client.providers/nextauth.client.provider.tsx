"use client";

import { SessionProvider as Provider } from "next-auth/react";

export const NextAuthProvider = ({ children }: React.PropsWithChildren) => {
  const basePath = "/eventos" ? `${"/eventos"}/api/auth` : undefined;

  return <Provider basePath={basePath}>{children}</Provider>;
};
