"use client";

import React from "react";
import { ControleEventoProvider } from "./controleEventoProvider";
import ListaEventos from "./_components/listaEventos";
import OpcaoesEvento from "./_components/opcoesEvento";

const ControleEventos = () => {
  return (
    <ControleEventoProvider>
      <div className="p-6 overflow-hidden w-full gap-4 h-full flex flex-col md:flex-row">
        <OpcaoesEvento />

        <ListaEventos />
      </div>
    </ControleEventoProvider>
  );
};

export default ControleEventos;
