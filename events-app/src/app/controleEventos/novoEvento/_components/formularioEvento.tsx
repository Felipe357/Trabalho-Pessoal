import { Button, Divider, SelectItem } from "@nextui-org/react";
import { HorasProps, useNovoEventoContext } from "../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";
import ControllerSelect from "@/components/form/controllerSelect";

import ControllerDatePicker from "@/components/form/controllerDatePicker";
import React from "react";

const FormularioEvento = () => {
  const { form } = useNovoEventoContext();

  const { control, watch } = form;

  const { horaFim, horaInicio } = watch();

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o título do evento",
            isRequired: true,
            label: "Título",
            labelPlacement: "outside",
            className: "w-2/6 min-w-full md:min-w-80",
          }}
          controllerProps={{ control: control, name: "novoEvento.nome" }}
        />

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui uma descrição para o evento",
            label: "Descrição",
            labelPlacement: "outside",
            className: "w-5/12 min-w-full md:min-w-80",
          }}
          controllerProps={{ control: control, name: "novoEvento.descricao" }}
        />

        <ControllerDatePicker
          controllerProps={{ control: control, name: "novoEvento.data" }}
        />

        <div className="flex flex-row items-center flex-nowrap gap-2">
          <ControllerSelect
            controllerProps={{
              control: control,
              name: "novoEvento.horaInicio",
            }}
            selectProps={{
              label: "Horário Início",
              labelPlacement: "outside",
              variant: "bordered",
              isRequired: true,
              className: "w-64",
              placeholder: "Selecione o horário de início",
              disabledKeys: horaInicio.disabledKeys,
              children: horaInicio.keys.map((e: HorasProps) => {
                return <SelectItem key={e.key}>{e.value}</SelectItem>;
              }),
            }}
          />

          <Divider className="w-10 mt-5 bg-[#A6A6A6]" />

          <ControllerSelect
            controllerProps={{ control: control, name: "novoEvento.horaFim" }}
            selectProps={{
              label: "Horário Fim",
              labelPlacement: "outside",
              variant: "bordered",
              isRequired: true,
              className: "w-64",
              placeholder: "Selecione o horário de término",
              disabledKeys: horaFim.disabledKeys,
              children: horaFim.keys.map((e: HorasProps) => {
                return <SelectItem key={e.key}>{e.value}</SelectItem>;
              }),
            }}
          />
        </div>

        <Button
          color="primary"
          onPress={() => console.log(watch("novoEvento"))}
        >
          Ver Form
        </Button>
      </div>
    </div>
  );
};

export default FormularioEvento;
