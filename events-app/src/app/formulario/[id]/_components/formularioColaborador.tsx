import { Button, Input, SelectItem } from "@nextui-org/react";
import { useFormularioContext } from "../formularioProvider";
import ControllerCheckbox from "@/components/form/controllerCheckbox";
import { parse } from "date-fns";
import ControllerSelect from "@/components/form/controllerSelect";

const FormColaborador = () => {
  const { form, evento, disclousureCamposImagens } = useFormularioContext();
  const { control, watch, setValue } = form;
  const { participantes } = watch();

  const colaborador = participantes.filter((e: any) => e.colaborador)[0];

  const index = participantes.indexOf(colaborador);

  const dataAtual = new Date();

  const providedDate = evento
    ? parse(evento.formulario.end, "dd/MM/yyyy", new Date())
    : new Date();

  const disable = dataAtual > providedDate;

  const { onOpen } = disclousureCamposImagens;

  return colaborador ? (
    <div className="flex flex-wrap gap-6 items-start">
      <Input
        isReadOnly
        variant="bordered"
        value={colaborador.colaborador.nome_completo}
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
        controllerProps={{
          control: control,
          name: `participantes.${index}.bebida_alcoolica`,
        }}
      />

      <ControllerCheckbox
        checkBoxProps={{
          title: "Vou com o ônibus da empresa?",
          isDisabled: disable,
        }}
        controllerProps={{
          control: control,
          name: `participantes.${index}.transporte`,
        }}
      />

      <div className="mt-[-25px]">
        {evento &&
          evento.campo &&
          evento.campo.length > 0 &&
          evento.campo.map((c, indexMap) => {
            return (
              <>
                <ControllerSelect
                  key={indexMap}
                  selectProps={{
                    label: c.titulo,
                    labelPlacement: "outside",
                    variant: "bordered",
                    isRequired: true,
                    className: "w-64 md:w-72",
                    placeholder: c.descricao,
                    children: c.valores.map(
                      (e: { titulo: string; valor: string }) => {
                        return (
                          <SelectItem key={e.valor}>{e.titulo}</SelectItem>
                        );
                      }
                    ),
                  }}
                  controllerProps={{
                    control: control,
                    name: `participantes.${index}.campos.${indexMap}`,
                  }}
                />
                <div className="h-14 flex items-center">
                  <Button
                    color="primary"
                    onPress={() => {
                      setValue("campoSelect", c);
                      onOpen();
                    }}
                  >
                    Ver imagens
                  </Button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default FormColaborador;
