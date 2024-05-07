import axios, { type AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";

// import DefaultAlert from '../components/DefaultAlert'

const getAPIClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: "http://10.0.2.113:3030",
  });

  api.interceptors.request.use(async (config): Promise<any> => {
    const session: any = await getSession();

    if (session) {
      // if (session?.expired === true) {
      //   const { isConfirmed } = await DefaultAlert({
      //     icon: 'warning',
      //     title: 'Sua sessão expirou, deseja renovar?',
      //     text: 'Voce será redirecionado.',
      //     showCancelButton: true,
      //     confirmButtonText: 'Sim',
      //     cancelButtonText: 'Não'
      //   })

      //   if (!isConfirmed) return null

      //   return (window.location.href = '/login')
      // }

      const { access_token } = session;

      if (typeof access_token === "string") {
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers["authorization-method"] = "oidc";
      }
    }

    return config;
  });

  // api.interceptors.response.use(
  //   response => response,
  //   async error => {
  //     if (
  //       String(error?.response?.data?.message).includes(
  //         'claim timestamp check failed'
  //       )
  //     ) {
  //       const { isConfirmed } = await DefaultAlert({
  //         icon: 'warning',
  //         title: 'Sua sessão expirou, deseja renovar?',
  //         text: 'Voce será redirecionado.',
  //         showCancelButton: true,
  //         confirmButtonText: 'Sim',
  //         cancelButtonText: 'Não'
  //       })

  //       if (!isConfirmed) return null

  //       await signOut()
  //       return (window.location.href = '/login')
  //     }

  //     throw error
  //   }
  // )

  return api;
};

export const api = getAPIClient();
