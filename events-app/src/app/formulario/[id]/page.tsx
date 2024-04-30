"use client";

import React from "react";

import Formulario from "./_components/formulario";
import { FomrularioProvider } from "./formularioProvider";
import FormularioHeader from "./_components/formularioHeader";
import FormularioFooter from "./_components/formularioFooter";
import ModalAceitar from "./_components/modalFormularioAceitar";
import ModalErro from "./_components/modalFormularioErro";
import ModalRequicisaoErro from "./_components/modalRequicisaoErro";
import ModalRequicisaoSucesso from "./_components/modalRequicisaoSucesso";

const PageFormulario = () => {
  return (
    <FomrularioProvider>
      <div className="p-6 overflow-hidden w-full flex flex-wrap justify-between gap-8">
        <FormularioHeader />

        <Formulario />

        <FormularioFooter />

        <ModalAceitar />
        <ModalErro />
        <ModalRequicisaoErro />
        <ModalRequicisaoSucesso />
      </div>
    </FomrularioProvider>
  );
};

export default PageFormulario;
