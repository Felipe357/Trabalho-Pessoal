"use client";

import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";

interface ControleEventoProviderProps extends React.PropsWithChildren {}

type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

interface ControleEventoContextProps {
  form: any;
  evento: any[];
  disclosureParticipantesEvento: DisclosureProps;
}

const evento = [
  {
    pulseiras: [
      {
        idadeInicio: "0",
        idadeFim: "5",
        color: "#40ff00",
        bebida: false,
      },
      {
        idadeInicio: "5",
        idadeFim: "18",
        color: "#ffde00",
        bebida: false,
      },
      {
        idadeInicio: "18",
        idadeFim: "99",
        color: "#000aff",
        bebida: false,
      },
      {
        idadeInicio: "18",
        idadeFim: "99",
        color: "#ff0000",
        bebida: true,
      },
    ],
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
    data: "30/04/2024",
    horaInicio: "12:00",
    horaFim: "18:30",
    foto: {
      name: "primavera1.jpg",
      foto: {},
    },
    formulario: {
      start: "22/04/2024",
      end: "27/04/2024",
    },
    participantes: [2, 1],
    idadeDependente: "18",
    filiais: [
      "a8a1a717-5802-4e17-9590-750f8de66f58",
      "dee0527a-2dc6-45ee-8847-d75174e2179b",
      "e3c83e00-526f-4201-826a-289fbc874b38",
      "957f3ed0-5c71-4e4c-95b4-918feecc83c4",
      "657811ed-7bd3-476b-b23e-f3304aa10081",
      "c9b6a079-3dd9-4f69-9eb5-ff2f02ae2081",
      "75309fe9-6bc7-4db3-9a6a-17244e9df0e5",
    ],
    cep: "13833024",
    endereco: "Rua Luiza Bertassola Milanes",
    numero: "682",
    bairro: "Jardim Vila Rica II",
    cidade: "Santo Antônio de Posse",
  },
];

export const ControleEventoContext = createContext(
  {} as ControleEventoContextProps
);

export function ControleEventoProvider({
  children,
}: ControleEventoProviderProps) {
  const form = useForm({
    defaultValues: {
      filter: {
        nome: "",
        tipoParticipante: "all",
        participacao: "all",
        bebida: "all",
        transporte: "all",
      },
      eventoSelect: {
        titulo: "Nenhum Evento Selecionado",
      },
    },
  });

  const disclosureParticipantesEvento = useDisclosure({
    id: "disclousure-participantes-evento",
  });

  return (
    <ControleEventoContext.Provider
      value={{
        form: form,
        evento: evento,
        disclosureParticipantesEvento: disclosureParticipantesEvento,
      }}
    >
      {children}
    </ControleEventoContext.Provider>
  );
}

export const useControleEventoContext = (): ControleEventoContextProps => {
  const context = useContext(ControleEventoContext);

  return context;
};
