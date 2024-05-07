"use client";

import React from "react";

import { PageProvider } from "./pageProvider";
import ModalEvento from "./_componets/modalEvento";
import ModalEventoCancelar from "./_componets/modalEventoCancelar";
import Eventos from "./_componets/eventos";
import ModalRequicisaoSucesso from "./_componets/modalRequicisaoSucesso";
import ModalRequicisaoErro from "./_componets/modalRequicisaoErro";
import ModalImagem from "./_componets/modalImagens";

export default function Home() {
  return (
    <PageProvider>
      <div className="p-6 overflow-hidden w-full flex flex-wrap gap-4">
        <Eventos />

        <ModalEvento />
        <ModalEventoCancelar />
        <ModalImagem />

        <ModalRequicisaoSucesso />
        <ModalRequicisaoErro />
      </div>
    </PageProvider>
  );
}
