import { type Filial, useNovoEventoContext } from "../../novoEventoProvider";

import React from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerCheckboxGroup from "@/components/form/controllerCheckboxGroup";

const FormularioFilial = () => {
  const { form } = useNovoEventoContext();

  const { control, watch } = form;

  const { filiais } = watch();

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-wrap gap-6 md:overflow-hidden overflow-y-scroll pr-2 md:pr-0">
        <ControllerCheckboxGroup
          checkboxGroupProps={{
            data: filiais.map((f: Filial) => {
              return {
                id: f.id,
                value: f.filial,
                label: f.filial + " - " + f.fazenda,
              };
            }),
          }}
          controllerProps={{ control: control, name: "novoEvento.filiais" }}
        />
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioFilial;
