import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const url = headers().get("x-url");
  // const callbackFromReq = new URL(url!).searchParams.get("callbackUrl");

  const callbackUrl =
    // callbackFromReq ??
    process.env.NEXT_PUBLIC_APP_URL + process.env.NEXT_PUBLIC_BASE_PATH;

  const authUrl = process.env.NEXTAUTH_URL!.split("/api")[0];

  const destination = new URL(
    `${authUrl}/auth/signin?callbackUrl=${callbackUrl}`
  ).toString();

  redirect(destination);
}
