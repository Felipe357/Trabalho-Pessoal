import { HorasProps, useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";

import React, { useEffect } from "react";
import NovoEventoFooter from "../novoEventoFooter";

const FormularioLocal = () => {
  const { form } = useNovoEventoContext();

  const { control, watch, setValue } = form;

  const { horas, novoEvento } = watch();

  useEffect(() => {
    if (novoEvento.horaInicio) {
      let disabledKeys = horas.keys.map((e: HorasProps) => {
        if (Number(e.key.slice(1)) <= Number(novoEvento.horaInicio.slice(1))) {
          return e.key;
        }
      });

      setValue("horas.disableKeysFim", disabledKeys);
    }

    if (novoEvento.horaFim) {
      let disabledKeys = horas.keys.map((e: HorasProps) => {
        if (Number(e.key.slice(1)) >= Number(novoEvento.horaFim.slice(1))) {
          return e.key;
        }
      });

      setValue("horas.disableKeysInicio", disabledKeys);
    }
  }, [horas.keys, novoEvento.horaFim, novoEvento.horaInicio, setValue]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-wrap gap-6">
        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o cep",
            isRequired: true,
            label: "Cep",
            labelPlacement: "outside",
            className: "w-40 min-w-full md:min-w-40",
          }}
          controllerProps={{ control: control, name: "novoEvento.cep" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o endereço",
            label: "Endereço",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-5/12 min-w-full md:min-w-80",
          }}
          controllerProps={{ control: control, name: "novoEvento.endereco" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o número / bloco / andar",
            label: "Número",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-64 min-w-full md:min-w-64",
          }}
          controllerProps={{ control: control, name: "novoEvento.numero" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o bairro",
            label: "Bairro",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-64 min-w-full md:min-w-64",
          }}
          controllerProps={{ control: control, name: "novoEvento.bairro" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui a cidade",
            label: "Cidade",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-5/12 min-w-full md:min-w-80",
          }}
          controllerProps={{ control: control, name: "novoEvento.cidade" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o complemento",
            label: "Complemento",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-5/12 min-w-full md:min-w-80",
          }}
          controllerProps={{ control: control, name: "novoEvento.complemento" }}
        />
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioLocal;
