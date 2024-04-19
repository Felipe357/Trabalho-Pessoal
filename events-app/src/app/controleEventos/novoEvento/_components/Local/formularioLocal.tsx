import { useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";

import React from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerTextArea from "@/components/form/controllerTextArea";

const FormularioLocal = () => {
  const { form } = useNovoEventoContext();

  const { control } = form;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-wrap gap-6 md:overflow-hidden overflow-y-scroll pr-2 md:pr-0">
        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o cep",
            isRequired: true,
            label: "Cep",
            labelPlacement: "outside",
            className: "w-60 min-w-full md:min-w-40",
            maxLength: 9,
          }}
          controllerProps={{ control: control, name: "novoEvento.cep" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o endereço",
            label: "Endereço",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-5/6 min-w-full md:min-w-80",
          }}
          controllerProps={{ control: control, name: "novoEvento.endereco" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o número",
            label: "Número",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-full md:w-60",
          }}
          controllerProps={{ control: control, name: "novoEvento.numero" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o bairro",
            label: "Bairro",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-full md:w-10/12",
          }}
          controllerProps={{ control: control, name: "novoEvento.bairro" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui a cidade",
            label: "Cidade",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.cidade" }}
        />

        <ControllerTextArea
          textAreaProps={{
            placeholder: "Digite aqui o complemento",
            label: "Complemento",
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.complemento" }}
        />
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioLocal;
