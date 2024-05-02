import { type Filial, useNovoEventoContext } from "../../novoEventoProvider";

import React from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerCheckboxGroup from "@/components/form/controllerCheckboxGroup";
import { Chip } from "@nextui-org/react";

const FormularioFilial = () => {
  const { form } = useNovoEventoContext();

  const { control, watch } = form;

  const { filiais, novoEvento } = watch();

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6 md:overflow-hidden overflow-y-scroll pr-2 md:pr-0">
        <ControllerCheckboxGroup
          checkboxGroupProps={{
            label: "Filial",
            isRequired: true,
            data: filiais.map((f: Filial) => {
              return {
                id: f.id,
                value: f.id,
                label: f.filial + " - " + f.fazenda,
              };
            }),
          }}
          controllerProps={{ control: control, name: "novoEvento.filiais" }}
        />

        <span className="text-small font-bold">
          Filiais Selecionadas - {novoEvento.filiais?.length ?? 0}
        </span>
        <div className="flex flex-wrap gap-3 overflow-y-auto">
          {novoEvento.filiais &&
            novoEvento.filiais.map((value: string) => {
              const filialFilter = filiais.filter(
                (e: { id: string }) => e.id === value
              )[0];
              return (
                <Chip key={value} color="primary">
                  {filialFilter && filialFilter.filial}
                </Chip>
              );
            })}
        </div>
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioFilial;
