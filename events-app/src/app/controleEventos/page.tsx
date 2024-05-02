"use client";

import React from "react";
import { ControleEventoProvider } from "./controleEventoProvider";
import OpcaoesEvento from "./_components/opcoesEvento";
import TabsListagemEventos from "./_components/tabsListagemEvento";
import ModalDesativarEvento from "./_components/modalDesativarEvento";
import ModalRequicisaoErro from "./_components/modalRequicisaoErro";
import ModalRequicisaoSucesso from "./_components/modalRequicisaoSucesso";

const ControleEventos = () => {
  return (
    <ControleEventoProvider>
      <div className="p-6 overflow-hidden w-full gap-4 h-full flex flex-col md:flex-row">
        <OpcaoesEvento />

        <TabsListagemEventos />
      </div>

      <ModalDesativarEvento />
      <ModalRequicisaoErro />
      <ModalRequicisaoSucesso />
    </ControleEventoProvider>
  );
};

export default ControleEventos;
