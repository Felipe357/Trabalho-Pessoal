"use client";

import NovoEventoHeader from "./_components/novoEventoHeader";
import { NovoEventoProvider } from "./novoEventoProvider";
import NovoEventoMain from "./_components/formularioEventoMain";
import ModalCadastroEvento from "./_components/modalCadastroEvento";
import ModalErroEvento from "./_components/modalErroEvento";
import ModalRequicisaoErro from "./_components/modalRequicisaoErro";
import ModalRequicisaoSucesso from "./_components/modalRequicisaoSucesso";

const NovoEvento = () => {
  return (
    <NovoEventoProvider>
      <div className="p-6 overflow-hidden w-full h-full flex flex-col items-start gap-8">
        <NovoEventoHeader />

        <NovoEventoMain />
      </div>

      <ModalCadastroEvento />
      <ModalErroEvento />
      <ModalRequicisaoErro />
      <ModalRequicisaoSucesso />
    </NovoEventoProvider>
  );
};

export default NovoEvento;
