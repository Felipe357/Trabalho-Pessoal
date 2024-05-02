import { useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";

import React, { useEffect, useState } from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerColor from "@/components/form/controllerColor";
import { Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const FormularioCampos = () => {
  const { form } = useNovoEventoContext();

  const { control, watch, setValue, handleSubmit } = form;

  const { novoEvento, campo: CampoForm } = watch();

  const { campo } = novoEvento;

  const { valores, titulo, descricao, tituloValor, valor } = CampoForm;

  const onSubmit = (data: any) => {
    setValue("novoEvento.campo", [
      ...campo,
      {
        titulo: titulo,
        descricao: descricao,
        valores: valores,
      },
    ]);

    setValue("campo", {
      titulo: "",
      descricao: "",
      tituloValor: "",
      valor: "",
      valores: [],
    });
  };

  const addValor = () => {
    setValue("campo", {
      titulo: titulo,
      descricao: descricao,
      tituloValor: "",
      valor: "",
      valores: [
        ...valores,
        {
          titulo: watch("campo.tituloValor"),
          valor: watch("campo.valor"),
        },
      ],
    });
  };

  const onClear = (key: number) => {
    setValue("campo", {
      titulo: titulo,
      descricao: descricao,
      tituloValor: tituloValor,
      valor: valor,
      valores: valores.filter((e: any, indexF: number) => indexF !== key),
    });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-wrap gap-6 overflow-y-auto pr-2 md:pr-0">
        <form
          className="flex w-full flex-wrap gap-6 md:overflow-hidden overflow-y-auto pr-2 md:pr-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControllerInput
            inputProps={{
              placeholder: "Digite o título do campo",
              isRequired: true,
              label: "Título",
              labelPlacement: "outside",
              className: "w-1/5 min-w-full md:min-w-40",
            }}
            controllerProps={{ control: control, name: "campo.titulo" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite a descrição do campo",
              description: "Ex: 'Selecione ...'",
              isRequired: true,
              label: "Descrição",
              labelPlacement: "outside",
              className: "w-3/4 min-w-full md:min-w-40",
            }}
            controllerProps={{ control: control, name: "campo.descricao" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite o título do valor",
              description: "Ex: 'Tamanho M'",
              label: "Título Valor",
              labelPlacement: "outside",
              className: "w-1/5 min-w-full md:min-w-40",
            }}
            controllerProps={{ control: control, name: "campo.tituloValor" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite o valor",
              description: "Ex: 'M'",
              label: "Valor",
              labelPlacement: "outside",
              className: "w-1/5 min-w-full md:min-w-40",
            }}
            controllerProps={{ control: control, name: "campo.valor" }}
          />

          <div className="w-2/5">
            <span>Valores</span>
            <div className="h-14 rounded-xl flex flex-row items-center p-2 gap-3 overflow-x-auto border-2 border-default-200">
              {valores.map((value: { titulo: string }, key: number) => (
                <Chip key={key} color="primary" onClose={() => onClear(key)}>
                  {value.titulo}
                </Chip>
              ))}
            </div>
          </div>

          <div className="h-20 flex items-end">
            <div className="h-14 flex items-center">
              <Button
                color="primary"
                onPress={addValor}
                startContent={<FontAwesomeIcon icon={faPlus} />}
              >
                Adicionar valor
              </Button>
            </div>
          </div>

          <div className="h-20 flex items-end">
            <div className="h-14 flex items-center">
              <Button
                color="primary"
                type="submit"
                startContent={<FontAwesomeIcon icon={faPlus} />}
              >
                Adicionar campo
              </Button>
            </div>
          </div>
        </form>

        {campo.length > 0 && (
          <Accordion variant="bordered">
            {campo.map(
              (
                p: {
                  titulo: string;
                  descricao: string;
                  valores: Array<{ titulo: string; valor: string }>;
                },
                index: number
              ) => {
                return (
                  <AccordionItem
                    key={index}
                    aria-label={p.titulo}
                    title={p.titulo}
                    startContent={
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        onPress={() => {
                          setValue(
                            "novoEvento.campo",
                            campo.filter(
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
                    }
                  >
                    <div className="flex flex-row gap-2">
                      {p.valores.map(
                        (value: { titulo: string }, key: number) => (
                          <Chip
                            key={key}
                            color="primary"
                            onClose={() => {
                              setValue(
                                `novoEvento.campo.${index}.valores`,
                                watch(
                                  `novoEvento.campo.${index}.valores`
                                ).filter(
                                  (e: any, indexF: number) => indexF !== index
                                )
                              );
                            }}
                          >
                            {value.titulo}
                          </Chip>
                        )
                      )}
                    </div>
                  </AccordionItem>
                );
              }
            )}
          </Accordion>
        )}
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioCampos;
