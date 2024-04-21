import { Button, SelectItem } from "@nextui-org/react";
import { HorasProps, useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";
import ControllerSelect from "@/components/form/controllerSelect";

import ControllerDatePicker from "@/components/form/controllerDatePicker";
import React, { useEffect, useRef } from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerInputFile from "@/components/form/controllerInputFile";
import ControllerTextArea from "@/components/form/controllerTextArea";

const FormularioEvento = () => {
  const pictureInput = useRef<HTMLInputElement>(null);
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
      <div className="flex flex-col gap-6 overflow-y-scroll md:overflow-hidden pr-2 md:pr-0">
        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o título do evento",
            isRequired: true,
            label: "Título",
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.nome" }}
        />

        <ControllerTextArea
          textAreaProps={{
            placeholder: "Digite aqui uma descrição para o evento",
            label: "Descrição",
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.descricao" }}
        />

        <div className="w-full flex flex-wrap gap-10">
          <ControllerDatePicker
            controllerProps={{ control: control, name: "novoEvento.data" }}
          />

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
              disabledKeys: horas.disableKeysInicio,
              children: horas.keys.map((e: HorasProps) => {
                return <SelectItem key={e.key}>{e.value}</SelectItem>;
              }),
            }}
          />

          <ControllerSelect
            controllerProps={{ control: control, name: "novoEvento.horaFim" }}
            selectProps={{
              label: "Horário Fim",
              labelPlacement: "outside",
              variant: "bordered",
              isRequired: true,
              className: "w-64",
              placeholder: "Selecione o horário de término",
              disabledKeys: horas.disableKeysFim,
              children: horas.keys.map((e: HorasProps) => {
                return <SelectItem key={e.key}>{e.value}</SelectItem>;
              }),
            }}
          />

          <div className="flex flex-col items-start justify-end w-full md:w-96">
            <span className=" font-bold text-sm">Foto</span>
            <Button
              variant="bordered"
              className={`${watch("novoEvento.foto") && "border-primary"
                } h-14 w-full border-dashed`}
              onClick={() => pictureInput.current?.click()}
            >
              <span className=" truncate">
                {watch("novoEvento.foto.name") ?? "Selecione uma foto"}
              </span>
            </Button>
          </div>

          <ControllerInputFile
            controllerProps={{ control: control, name: "novoEvento.foto" }}
            inputProps={{
              ref: pictureInput,
              className: "hidden",
              type: "file",
              accept: "image/png, image/jpeg",
            }}
          />
        </div>
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioEvento;
