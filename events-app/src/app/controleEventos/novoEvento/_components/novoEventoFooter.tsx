"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNovoEventoContext } from "../novoEventoProvider";

const NovoEventoFooter = () => {
  const { form } = useNovoEventoContext();

  const { setValue, watch } = form;

  const { tabs, novoEvento } = watch();

  const { select, tabs: list } = tabs;

  const {
    titulo,
    data,
    horaInicio,
    horaFim,
    formulario,
    participantes,
    idadeDependente,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    filiais,
    pulseiras,
    campos,
  } = novoEvento;

  const setProxPage = (): string => {
    return list[list.indexOf(select) + 1] ?? list[0];
  };

  const setAntPage = (): string => {
    return list[list.indexOf(select) - 1] ?? list[0];
  };

  const enviarEvento = () => {
    if (!validarForm()) {
      console.log(novoEvento);
    }
  };

  const validarForm = () => {
    if (
      !titulo ||
      !data ||
      !horaInicio ||
      !horaFim ||
      !formulario ||
      !formulario.start ||
      !formulario.end
    ) {
      console.log("Evento");
      return true;
    }

    if (!participantes) {
      setValue("novoEvento.participantes", 1);
    } else {
      let part = 1;
      participantes.map((e: number) => {
        part = part + e;
      });

      setValue("novoEvento.participantes", part);
    }

    if (!cep || !endereco || !numero || !bairro || !cidade) {
      console.log("Local");
      return true;
    }

    if (!filiais || filiais.length === 0) {
      console.log("Filial");
      return true;
    }

    if (!pulseiras || pulseiras.length === 0) {
      console.log("Pulseira");
      return true;
    }

    if (!campos || campos.length === 0) {
      console.log("Campos");
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-row justify-between items-center gap-4 w-full m-3 md:m-6">
      {list.indexOf(select) > 0 ? (
        <Button
          color="default"
          size="lg"
          onPress={() => {
            setValue("tabs.select", setAntPage());
          }}
          startContent={<FontAwesomeIcon icon={faChevronLeft} />}
        >
          Anterior
        </Button>
      ) : (
        <></>
      )}
      {list.indexOf(select) === list.length - 1 ? (
        <Button color="primary" size="lg" onPress={enviarEvento}>
          Concluir
        </Button>
      ) : (
        <Button
          color="primary"
          size="lg"
          onPress={() => {
            setValue("tabs.select", setProxPage());
          }}
          endContent={<FontAwesomeIcon icon={faChevronRight} />}
        >
          Próximo
        </Button>
      )}
    </div>
  );
};

export default NovoEventoFooter;
