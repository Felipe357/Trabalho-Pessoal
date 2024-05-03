import { Button, SelectItem } from "@nextui-org/react";
import { HorasProps, useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";
import ControllerSelect from "@/components/form/controllerSelect";

import ControllerDatePicker from "@/components/form/controllerDatePicker";
import React, { useEffect, useRef } from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerInputFile from "@/components/form/controllerInputFile";
import ControllerTextArea from "@/components/form/controllerTextArea";
import ControllerCheckboxGroup from "@/components/form/controllerCheckboxGroup";
import ControllerDateRangerPicker from "@/components/form/controllerDateRangerPicker";

const FormularioEvento = () => {
  const pictureInput = useRef<HTMLInputElement>(null);
  const { form } = useNovoEventoContext();

  const { control, watch, setValue } = form;

  const { horas, novoEvento } = watch();

  useEffect(() => {
    if (novoEvento.horaInicio) {
      const disabledKeys = horas.keys
        .map((e: HorasProps) => {
          if (e.value <= novoEvento.horaInicio) {
            return e.value;
          }
        })
        .filter(Boolean);

      setValue("horas.disableKeysFim", disabledKeys);
    }

    if (novoEvento.horaFim) {
      const disabledKeys = horas.keys
        .map((e: HorasProps) => {
          if (e.value >= novoEvento.horaFim) {
            return e.value;
          }
        })
        .filter(Boolean);

      setValue("horas.disableKeysFim", disabledKeys);
    }
  }, [horas.keys, novoEvento.horaFim, novoEvento.horaInicio, setValue]);

  const convidados = [
    {
      id: "01",
      value: 1,
      label: "Acompanhante",
    },
    {
      id: "02",
      value: 2,
      label: "Dependente",
    },
  ];

  useEffect(() => {
    if (novoEvento.foto_base64 && !novoEvento.foto) {
      setValue("novoEvento.foto", {
        name: novoEvento.foto_base64.nome ?? "Arquivo sem nome",
        foto: novoEvento.foto_base64.foto,
      });
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6 overflow-y-auto pr-2 md:pr-0">
        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui o título do evento",
            isRequired: true,
            label: "Título",
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.titulo" }}
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

        <div className="w-full flex flex-wrap gap-6">
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
                return <SelectItem key={e.value}>{e.value}</SelectItem>;
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
                return <SelectItem key={e.value}>{e.value}</SelectItem>;
              }),
            }}
          />

          <div className="flex flex-col items-start justify-end w-full md:w-96">
            <span className=" font-bold text-sm">Foto</span>
            <Button
              variant="bordered"
              className={`${
                watch("novoEvento.foto") && "border-primary"
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

          <ControllerDateRangerPicker
            controllerProps={{
              control: control,
              name: "novoEvento.formulario",
            }}
          />

          <ControllerCheckboxGroup
            checkboxGroupProps={{
              label: "Participantes",
              className: "max-w-max",
              data: convidados.map((f) => {
                return {
                  id: f.id,
                  value: f.value,
                  label: f.label,
                };
              }),
            }}
            controllerProps={{
              control: control,
              name: "novoEvento.tipo_participante",
            }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui a idade máxima",
              defaultValue: "0",
              min: 0,
              label: "Idade Máxima do Dependente",
              labelPlacement: "outside",
              className: "w-64",
              type: "number",
              isDisabled:
                novoEvento.tipo_participante &&
                novoEvento.tipo_participante.some((e: number) => e === 2)
                  ? false
                  : true,
            }}
            controllerProps={{
              control: control,
              name: "novoEvento.idade_dependente",
            }}
          />
        </div>
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioEvento;
