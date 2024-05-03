import { useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";
import { uuid } from "uuidv4";

import React, { useRef } from "react";
import NovoEventoFooter from "../novoEventoFooter";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ControllerInputFile from "@/components/form/controllerInputFile";
import ModalVisualizarImagem from "./modalVisualizarImagem";
import Image from "next/image";

const FormularioCampos = () => {
  const pictureInput = useRef<HTMLInputElement>(null);
  const { form, disclousureImagemCampo } = useNovoEventoContext();

  const { onOpen } = disclousureImagemCampo;

  const { control, watch, setValue, handleSubmit } = form;

  const { novoEvento, campo: CampoForm } = watch();

  const { campo } = novoEvento;

  const { valores, titulo, descricao, tituloValor, valor, fotos } = CampoForm;

  const onSubmit = (data: any) => {
    setValue("novoEvento.campo", [
      ...campo,
      {
        id: uuid(),
        titulo: titulo,
        descricao: descricao,
        valores: valores,
        fotos: fotos,
      },
    ]);

    setValue("campo", {
      titulo: "",
      descricao: "",
      tituloValor: "",
      valor: "",
      valores: [],
      fotos: [],
    });
  };

  const addFoto = () => {
    setValue("campo", {
      titulo: titulo,
      descricao: descricao,
      tituloValor: tituloValor,
      valor: valor,
      valores: valores,
      fotos: [
        ...fotos,
        {
          index: fotos.length + 1,
          name: watch("campo.foto.name"),
          foto: watch("campo.foto.foto"),
        },
      ],
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
      fotos: fotos,
    });
  };

  const onClear = (key: number) => {
    setValue("campo", {
      titulo: titulo,
      descricao: descricao,
      tituloValor: tituloValor,
      valor: valor,
      valores: valores.filter((e: any, indexF: number) => indexF !== key),
      fotos: fotos,
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
              className: "w-3/5 min-w-full md:min-w-40",
            }}
            controllerProps={{ control: control, name: "campo.descricao" }}
          />

          <div className="h-20 flex items-end">
            <Tooltip
              content={
                valores.length === 0 ? "Adicone valores" : "Adicionar Campo"
              }
              color="primary"
              placement="bottom"
            >
              <div className="h-14 flex items-center">
                <Button
                  color="primary"
                  type="submit"
                  startContent={<FontAwesomeIcon icon={faPlus} />}
                  isDisabled={valores.length === 0}
                >
                  Adicionar campo
                </Button>
              </div>
            </Tooltip>
          </div>
        </form>

        <Divider className="w-full" />

        <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
          <div className="h-20 flex flex-col items-start justify-end w-full md:w-96">
            <span className=" font-bold text-sm">Foto</span>
            <Button
              variant="bordered"
              className={`${
                watch("campo.foto") && "border-primary"
              } h-14 w-full border-dashed`}
              onClick={() => pictureInput.current?.click()}
            >
              <span className=" truncate">
                {watch("campo.foto.name") ?? "Selecione uma foto"}
              </span>
            </Button>
          </div>

          <ControllerInputFile
            controllerProps={{ control: control, name: "campo.foto" }}
            inputProps={{
              ref: pictureInput,
              className: "hidden",
              type: "file",
              accept: "image/png, image/jpeg",
            }}
          />

          <div className="h-20 flex items-end">
            <div className="h-14 flex items-center">
              <Button
                color="primary"
                onPress={addFoto}
                startContent={<FontAwesomeIcon icon={faPlus} />}
                isDisabled={watch("campo.foto") ? false : true}
              >
                Adicionar foto
              </Button>
            </div>
          </div>

          <div className="w-full">
            <span>Fotos</span>
            <div className="h-14 rounded-xl flex flex-row items-center p-2 gap-3 border-2 border-default-200">
              {fotos.map(
                (
                  value: { foto: any; name: string; index: number },
                  key: number
                ) => (
                  <Button
                    isIconOnly
                    key={key}
                    radius="full"
                    onPress={() => {
                      setValue("imagemCampo", value);
                      onOpen();
                    }}
                  >
                    <Image
                      src={URL.createObjectURL(value.foto)}
                      alt={"Imagem Campo"}
                      className="rounded-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </Button>
                )
              )}
            </div>
          </div>
        </div>

        <Divider className="w-full" />

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

        {campo.length > 0 && (
          <Accordion variant="bordered">
            {campo.map(
              (
                p: {
                  titulo: string;
                  descricao: string;
                  valores: Array<{ titulo: string; valor: string; foto: any }>;
                  fotos: any;
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
                    <div className="flex flex-col gap-4">
                      <span className=" text-lg">Valores</span>
                      <div className="flex flex-row gap-2">
                        {p.valores.map(
                          (
                            value: { titulo: string; foto: any },
                            key: number
                          ) => (
                            <div key={key} className="flex items-center gap-2">
                              <Chip
                                color="primary"
                                onClose={() => {
                                  setValue(
                                    `novoEvento.campo.${index}.valores`,
                                    watch(
                                      `novoEvento.campo.${index}.valores`
                                    ).filter(
                                      (e: any, indexF: number) =>
                                        indexF !== index
                                    )
                                  );
                                }}
                              >
                                {value.titulo}
                              </Chip>
                            </div>
                          )
                        )}
                      </div>

                      <Divider className="w-full" />

                      <span className=" text-lg">Fotos</span>

                      <div className="flex flex-row gap-2">
                        {p.fotos &&
                          p.fotos.map(
                            (
                              value: { foto: any; name: string; index: number },
                              key: number
                            ) => (
                              <Button isIconOnly key={key} radius="full">
                                <Image
                                  src={URL.createObjectURL(value.foto)}
                                  alt={"Imagem Campo"}
                                  className="rounded-full"
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </Button>
                            )
                          )}
                      </div>
                    </div>
                  </AccordionItem>
                );
              }
            )}
          </Accordion>
        )}
      </div>

      <ModalVisualizarImagem />

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioCampos;
