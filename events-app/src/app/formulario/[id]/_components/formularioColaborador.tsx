import { Input, SelectItem } from "@nextui-org/react";
import { useFomrularioContext } from "../formularioProvider";
import ControllerCheckbox from "@/components/form/controllerCheckbox";
import { parse } from "date-fns";
import ControllerSelect from "@/components/form/controllerSelect";

const FormColaborador = () => {
  const { form, evento } = useFomrularioContext();
  const { control, watch } = form;
  const { colaborador } = watch();

  const dataAtual = new Date();

  const providedDate = evento
    ? parse(evento.formulario.end, "dd/MM/yyyy", new Date())
    : new Date();

  const disable = dataAtual > providedDate;

  return (
    <div className="flex flex-wrap gap-6 items-start">
      <Input
        isReadOnly
        variant="bordered"
        defaultValue={colaborador?.nome}
        className="w-full max-w-96"
        classNames={{
          inputWrapper: `h-14 border-[#52b032]`,
        }}
      />
      <ControllerCheckbox
        checkBoxProps={{
          title: "Consumo de bebida alcoolica?",
          isDisabled: disable,
        }}
        controllerProps={{ control: control, name: "colaborador.bebida" }}
      />

      <ControllerCheckbox
        checkBoxProps={{
          title: "Vou com o ônibus da empresa?",
          isDisabled: disable,
        }}
        controllerProps={{ control: control, name: "colaborador.transporte" }}
      />

      <div className="mt-[-25px]">
        {evento &&
          evento.campos &&
          evento.campos.length > 0 &&
          evento.campos.map((c, index) => {
            return (
              <ControllerSelect
                key={index}
                selectProps={{
                  label: c.titulo,
                  labelPlacement: "outside",
                  variant: "bordered",
                  isRequired: true,
                  className: "w-64 md:w-72",
                  placeholder: c.descricao,
                  children: c.valores.map(
                    (e: { titulo: string; valor: string }) => {
                      return <SelectItem key={e.valor}>{e.titulo}</SelectItem>;
                    }
                  ),
                }}
                controllerProps={{
                  control: control,
                  name: `colaborador.campos.${index}`,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FormColaborador;
