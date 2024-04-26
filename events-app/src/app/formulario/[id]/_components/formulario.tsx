"use client";

import React from "react";
import { useFomrularioContext } from "../formularioProvider";
import { Divider } from "@nextui-org/react";
import FormColaborador from "./formularioColaborador";
import FormDependente from "./formularioDependente";
import FormAcompanhante from "./formularioAcompanhante";

const Formulario = () => {
  const { evento, form } = useFomrularioContext();

  const { watch } = form;

  const { colaborador } = watch();

  return (
    <div className=" w-full p-6 md:p-10 border-[#eeeeee] rounded-2xl border-2">
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold text-xl">Colaborador</span>

        <FormColaborador />

        {evento && colaborador && (
          <>
            {evento.tipo_participante >= 3 ? (
              <>
                <Divider />
                <span className="font-bold text-xl">Dependentes</span>
              </>
            ) : (
              <></>
            )}

            {evento.tipo_participante >= 3 ? (
              colaborador.dependentes.map((de: any, index: number) => {
                return (
                  de.tipo === 1 && <FormDependente key={index} index={index} />
                );
              })
            ) : (
              <></>
            )}

            {evento.tipo_participante === 2 ||
              (evento.tipo_participante === 4 && (
                <>
                  <Divider />
                  <span className="font-bold text-xl">Acompanhante</span>
                </>
              ))}

            {evento.tipo_participante === 2 ||
            evento.tipo_participante === 4 ? (
              colaborador.dependentes.map((de: any, index: number) => {
                return (
                  de.tipo === 0 && (
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
