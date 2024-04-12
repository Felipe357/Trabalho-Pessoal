"use client";

import React from "react";
import { useFomrularioContext } from "../formularioProvider";
import { Divider } from "@nextui-org/react";
import FormColaborador from "./formularioColaborador";
import FormDependente from "./formularioDependente";
import FormAcompanhante from "./formularioAcompanhante";

const Formulario = () => {
  const { form, evento } = useFomrularioContext();

  const { watch } = form;

  const { colaborador } = watch();

  console.log(evento);

  return (
    <div className=" w-full md:mx-10 p-6 md:p-10 border-[#eeeeee] rounded-2xl border-2">
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold text-2xl">Colaborador</span>

        <FormColaborador />

        {evento && (
          <>
            {evento.tipoConvidado === 2 || evento.tipoConvidado === 4 ? (
              <>
                <Divider />
                <span className="font-bold text-2xl">Dependentes</span>
              </>
            ) : (
              <></>
            )}

            {evento.tipoConvidado === 2 || evento.tipoConvidado === 4 ? (
              colaborador.dependentes.map((de: any, index: number) => {
                return (
                  de.tipo === 1 && <FormDependente key={index} index={index} />
                );
              })
            ) : (
              <></>
            )}

            {evento.tipoConvidado >= 3 && (
              <>
                <Divider />
                <span className="font-bold text-2xl">Acompanhante</span>
              </>
            )}

            {evento.tipoConvidado === 3 || evento.tipoConvidado === 4 ? (
              colaborador.dependentes.map((de: any, index: number) => {
                return (
                  de.tipo === 2 && (
                    <FormAcompanhante key={index} index={index} />
                  )
                );
              })
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Formulario;
