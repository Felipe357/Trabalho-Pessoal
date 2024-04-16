import { Button, SelectItem } from "@nextui-org/react";
import { useNovoEventoContext } from "../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";
import ControllerSelect from "@/components/form/controllerSelect";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

const FormularioEvento = () => {
  const { form } = useNovoEventoContext();

  const { control, watch } = form;

  const horas: string[] = [];

  const carregarHorario = () => {
    for (let index = 0; index < 24; index++) {
      horas.push(
        index.toString().length === 1
          ? "0" + index.toString() + ":00"
          : index.toString() + ":00"
      );
      horas.push(
        index.toString().length === 1
          ? "0" + index.toString() + ":30"
          : index.toString() + ":30"
      );
    }
  };

  carregarHorario();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            controllerProps={{ control: control, name: "evento.nome" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui uma descrição para o evento",
              label: "Descrição",
              labelPlacement: "outside",
              className: "w-5/12 min-w-full md:min-w-80",
            }}
            controllerProps={{ control: control, name: "evento.descricao" }}
          />

          <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-1">
              <span>Data do Evento</span>
              <FontAwesomeIcon icon={faAsterisk} color="#F31260" width={8} />
            </div>
            <DatePicker minDate={new Date()} />
          </div>

          <ControllerSelect
            controllerProps={{ control: control, name: "evento.hora" }}
            selectProps={{
              label: "Horário",
              labelPlacement: "outside",
              variant: "bordered",
              isRequired: true,
              className: "w-64",
              placeholder: "Selecione o horário de início",
              children: horas.map((e) => {
                return <SelectItem key={e}>{e}</SelectItem>;
              }),
            }}
          />

          <Button onPress={() => console.log(watch("evento"))}>Ver Form</Button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default FormularioEvento;
