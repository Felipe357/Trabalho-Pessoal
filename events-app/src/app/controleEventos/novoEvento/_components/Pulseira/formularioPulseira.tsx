import { useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";

import React, { useEffect, useState } from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerColor from "@/components/form/controllerColor";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ControllerCheckbox from "@/components/form/controllerCheckbox";

const FormularioPulseira = () => {
  const { form } = useNovoEventoContext();

  const { control, watch, setValue, handleSubmit } = form;

  const { novoEvento, pulseira } = watch();

  const { idadeInicio, idadeFim } = pulseira;

  const { pulseiras } = novoEvento;

  const adicionarPulceira = (): void => {
    if (pulseiras.length > 0) {
      setValue("novoEvento.pulseiras", [...pulseiras, watch("pulseira")]);
    } else {
      setValue("novoEvento.pulseiras", [watch("pulseira")]);
    }

    setValue("pulseira", {
      idadeInicio: "",
      idadeFim: "",
      color: "#3E7E28",
      bebida: false,
    });
  };

  const [isDisable, setDisable] = useState(false);

  useEffect(() => {
    if (Number(pulseira.idadeInicio) < 18) {
      setDisable(true);
      setValue("pulseira.bebida", false);
    } else {
      setDisable(false);
    }
  }, [pulseira.idadeInicio, setValue]);

  const onSubmit = (data: any) => {
    adicionarPulceira();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-wrap gap-6 md:overflow-hidden overflow-y-scroll pr-2 md:pr-0">
        <form
          className="flex flex-wrap gap-6 md:overflow-hidden overflow-y-scroll pr-2 md:pr-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui a idade inicial",
              isRequired: true,
              label: "Idade Inicial",
              labelPlacement: "outside",
              className: "w-60 min-w-full md:min-w-40",
              type: "number",
              isInvalid:
                idadeInicio.trim() !== "" &&
                idadeFim.trim() !== "" &&
                Number(idadeInicio) >= Number(idadeFim),
            }}
            controllerProps={{ control: control, name: "pulseira.idadeInicio" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui a idade final",
              label: "Idade Final",
              isRequired: true,
              labelPlacement: "outside",
              className: "w-60 min-w-full md:min-w-80",
              type: "number",
              isInvalid:
                idadeFim.trim() !== "" &&
                idadeInicio.trim() !== "" &&
                Number(idadeFim) <= Number(idadeInicio),
            }}
            controllerProps={{ control: control, name: "pulseira.idadeFim" }}
          />

          <div className="h-20 flex flex-col items-start justify-end gap-0.5">
            <span className="font-bold text-sm">Cor</span>

            <ControllerColor
              controllerProps={{ control: control, name: "pulseira.color" }}
            />
          </div>

          <div className="h-20 flex items-end">
            <div className="h-14 flex items-center">
              <ControllerCheckbox
                controllerProps={{ control: control, name: "pulseira.bebida" }}
                checkBoxProps={{
                  title: "Consumo de bebida alcoolica?",
                  isDisabled: isDisable,
                }}
              />
            </div>
          </div>

          <div className="h-20 flex items-end">
            <div className="h-14 flex items-center">
              <Button
                color="primary"
                type="submit"
                startContent={<FontAwesomeIcon icon={faPlus} />}
              >
                Adicionar pulseira
              </Button>
            </div>
          </div>
        </form>

        {pulseiras.length > 0 && (
          <Table
            isHeaderSticky
            aria-label="Pulseiras"
            classNames={{
              base: "max-h-[520px] overflow-y-scroll",
              wrapper: "shadow-sm",
            }}
          >
            <TableHeader>
              <TableColumn>Idade (de / até)</TableColumn>
              <TableColumn>Bebida</TableColumn>
              <TableColumn>Cor</TableColumn>
              <TableColumn>Ação</TableColumn>
            </TableHeader>
            <TableBody>
              {pulseiras.map(
                (
                  p: {
                    idadeInicio: string;
                    idadeFim: string;
                    color: string;
                    bebida: boolean;
                  },
                  index: number
                ) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {p.idadeInicio} á {p.idadeFim} anos
                      </TableCell>
                      <TableCell>
                        {p.bebida ? (
                          <Chip color="primary" radius="sm">
                            Sim
                          </Chip>
                        ) : (
                          <Chip color="danger" radius="sm">
                            Não
                          </Chip>
                        )}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`h-6 w-6 rounded-md`}
                          style={{ backgroundColor: p.color }}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          variant="light"
                          color="danger"
                          onPress={() => {
                            setValue(
                              "novoEvento.pulseiras",
                              pulseiras.filter(
                                (e: any, indexF: number) => indexF !== index
                              )
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size="xl"
                            color="#F00"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioPulseira;
