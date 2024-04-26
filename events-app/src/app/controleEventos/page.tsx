"use client";

import React from "react";
import { ControleEventoProvider } from "./controleEventoProvider";
import OpcaoesEvento from "./_components/opcoesEvento";
import TabsListagemEventos from "./_components/tabsListagemEvento";

const ControleEventos = () => {
  return (
    <ControleEventoProvider>
      <div className="p-6 overflow-hidden w-full gap-4 h-full flex flex-col md:flex-row">
        <OpcaoesEvento />

        <TabsListagemEventos />
      </div>
    </ControleEventoProvider>
  );
};

export default ControleEventos;
