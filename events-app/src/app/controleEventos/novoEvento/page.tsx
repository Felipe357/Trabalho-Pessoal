"use client";

import NovoEventoHeader from "./_components/novoEventoHeader";
import { NovoEventoProvider } from "./novoEventoProvider";
import NovoEventoMain from "./_components/formularioEventoMain";
import ModalCadastroEvento from "./_components/modalCadastroEvento";
import ModalErroEvento from "./_components/modalErroEvento";

const NovoEvento = () => {
  return (
    <NovoEventoProvider>
      <div className="p-6 overflow-hidden w-full h-full flex flex-col items-start gap-8">
        <NovoEventoHeader />

        <NovoEventoMain />
      </div>

      <ModalCadastroEvento />
      <ModalErroEvento />
    </NovoEventoProvider>
  );
};

export default NovoEvento;
