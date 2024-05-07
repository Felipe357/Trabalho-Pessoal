import { redirect } from "next/navigation";

export default function Page() {
  const authUrl = process.env.NEXTAUTH_URL!.split("/api")[0];

  const callbackUrl = process.env.NEXT_PUBLIC_APP_URL + "/eventos";

  const destination = new URL(
    `${authUrl}/auth/signout?callbackUrl=${callbackUrl}`
  ).toString();

  redirect(destination);
}
