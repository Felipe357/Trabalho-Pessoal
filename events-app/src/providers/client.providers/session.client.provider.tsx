"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SessionProvider({
  children,
}: React.PropsWithChildren<any>) {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const { push } = useRouter();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const path = process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH + pathname
    : pathname;

  const callbackUrl = `${origin}${path}`;

  useEffect(() => {
    if (
      status !== "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      push(`/signin?callbackUrl=${callbackUrl}`);
    }
  }, [session, status]);

  useEffect(() => {
    const interval = setInterval(async () => await update(), 1000 * 60 * 60);

    if (
      status !== "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      push(`/signin?callbackUrl=${callbackUrl}`);
    }

    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    const visibilityHandler = (): void => {
      document.visibilityState === "visible" && update();
    };

    window.addEventListener("visibilitychange", visibilityHandler, false);

    if (
      status !== "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      push(`/signin?callbackUrl=${callbackUrl}`);
    }

    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false);
  }, [update]);

  return <>{children}</>;
}
