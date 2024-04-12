"use client";

import { Button } from "@nextui-org/react";

import React from "react";

import Formulario from "./_components/formulario";
import { FomrularioProvider } from "./formularioProvider";
import FormularioHeader from "./_components/formularioHeader";
import FormularioFooter from "./_components/formularioFooter";
import ModalAceitar from "./_components/modalAceitar";

const PageFormulario = () => {
  return (
    <FomrularioProvider>
      <div className="p-6 overflow-hidden w-full flex flex-wrap justify-between gap-y-4">
        <FormularioHeader />

        <Formulario />

        <FormularioFooter />

        <ModalAceitar />
      </div>
    </FomrularioProvider>
  );
};

export default PageFormulario;
