"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Navigation } from "@/components/navigation";

import Teste from "../assets/download.png";
import { useForm } from "react-hook-form";

export type EventoProp = {
  id: string;
  campos: [
    {
      titulo: string;
      descricao: string;
      valores: {
        titulo: string;
        valor: string;
      }[];
    }
  ];
  titulo: string;
  descricao?: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  foto: {
    name: string;
    foto: {};
  };
  formulario: {
    start: string;
    end: string;
  };
  participantes: number;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  confirmacao: boolean;
  idadeDependente: number;
  situacao: number;
};

const eventosTeste: EventoProp[] = [
  {
    id: "1234",
    campos: [
      {
        titulo: "Camiseta",
        descricao: "Selecione um tamanho de camiseta",
        valores: [
          {
            titulo: "Tamanho P",
            valor: "P",
          },
          {
            titulo: "Tamanho M",
            valor: "M",
          },
          {
            titulo: "Tamanho G",
            valor: "G",
          },
        ],
      },
    ],
    titulo: "Comemoração 65 Anos Terra Viva",
    descricao: "",
    data: "30/04/2024",
    horaInicio: "12:00",
    horaFim: "18:30",
    foto: {
      name: "primavera1.jpg",
      foto: Teste,
    },
    formulario: {
      start: "22/04/2024",
      end: "27/04/2024",
    },
    participantes: 4,
    cep: "13833024",
    endereco: "Rua Luiza Bertassola Milanes",
    numero: "682",
    bairro: "Jardim Vila Rica II",
    cidade: "Santo Antônio de Posse",
    confirmacao: false,
    idadeDependente: 18,
    situacao: 1,
  },
];

interface InicialContextProps {
  evento: EventoProp[];
  form: any;
}

export const InicialContext = React.createContext({} as InicialContextProps);

const AppProvider = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  const [maxLength, setMaxLength] = React.useState(true);

  React.useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth < 768 ? false : true);
    };

    updateMaxLength();

    window.addEventListener("resize", updateMaxLength);

    return () => {
      window.removeEventListener("resize", updateMaxLength);
    };
  }, []);

  const form = useForm();

  return (
    <NextUIProvider className="provider">
      <InicialContext.Provider
        value={{
          evento: eventosTeste,
          form: form,
        }}
      >
        <Navigation open={open} setOpen={setOpen} />
        <div
          style={{
            height: "92vh",
            marginTop: "60px",
            marginLeft: `${maxLength && open ? "320px" : "0px"}`,
            transition: "margin-left .3s ease-in-out",
          }}
          className="events"
        >
          {children}
        </div>
      </InicialContext.Provider>
    </NextUIProvider>
  );
};

export default AppProvider;

export const useInicialContext = (): InicialContextProps => {
  const context = React.useContext(InicialContext);

  return context;
};
