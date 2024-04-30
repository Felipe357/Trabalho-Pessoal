"use client";

import React from "react";
import { useFormularioContext } from "../formularioProvider";
import { Divider } from "@nextui-org/react";
import FormColaborador from "./formularioColaborador";
import FormDependente from "./formularioDependente";
import FormAcompanhante from "./formularioAcompanhante";

const Formulario = () => {
  const { evento, form } = useFormularioContext();

  const { watch } = form;

  const { participantes } = watch();

  const tipo = evento?.tipo_participante as unknown as number;

  const dependentes = participantes.filter(
    (e: any) => e.dependente && e.dependente.tipo === 1
  );

  const dependenteAcompanhante = participantes.filter(
    (e: any) => e.dependente && e.dependente.tipo === 0
  );

  const acompanhantes =
    dependenteAcompanhante.length > 0
      ? dependenteAcompanhante
      : participantes.filter((e: any) => e.acompanhante !== null);

  return (
    <div className=" w-full p-6 md:p-10 border-[#eeeeee] rounded-2xl border-2">
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold text-xl">Colaborador</span>

        <FormColaborador />

        {evento && participantes && (
          <>
            {tipo >= 3 && dependentes.length > 0 ? (
              <>
                <Divider />
                <span className="font-bold text-xl">Dependentes</span>
              </>
            ) : (
              <></>
            )}

            {tipo >= 3 ? (
              dependentes.map((de: any, index: number) => {
                return <FormDependente key={index} dependente={de} />;
              })
            ) : (
              <></>
            )}

            {tipo === 2 || tipo === 4 ? (
              <>
                <Divider />
                <span className="font-bold text-xl">Acompanhante</span>
              </>
            ) : (
              <></>
            )}

            {tipo === 2 || tipo === 4 ? (
              acompanhantes.length > 0 ? (
                acompanhantes.map((de: any, index: number) => {
                  return <FormAcompanhante key={index} dependente={de} />;
                })
              ) : (
                <FormAcompanhante />
              )
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
