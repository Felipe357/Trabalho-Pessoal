"use client";

import { Button, ButtonProps as NextUiButtonProps } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ButtonProps = NextUiButtonProps;

export function HomeSignInButton({ ...props }: ButtonProps) {
  const { status } = useSession();
  const { push } = useRouter();

  const startPath = process.env.NEXT_PUBLIC_BASE_PATH;

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const callbackUrl = `${origin}${startPath}`;

  return (
    <Button
      className="w-32 text-sm font-semibold"
      isLoading={status === "loading"}
      onClick={() => {
        push(`/auth/signin?callbackUrl=${callbackUrl}`);
      }}
      color="primary"
    >
      Fazer Login
    </Button>
  );
}
