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

  const { tabs } = watch();

  const { select, tabs: list } = tabs;

  const setPage = (): string => {
    return list[list.indexOf(select) + 1] ?? list[0];
  };

  return (
    <div className="flex flex-row justify-between items-center gap-4 w-full m-3 md:m-6">
      {list.indexOf(select) > 0 ? (
        <Button
          color="default"
          size="lg"
          onPress={() => {
            setValue("tabs.select", setPage());
          }}
          startContent={<FontAwesomeIcon icon={faChevronLeft} />}
        >
          Anterior
        </Button>
      ) : (
        <></>
      )}
      {list.indexOf(select) === list.length - 1 ? (
        <Button
          color="primary"
          size="lg"
          onPress={() => {
            setValue("tabs.select", setPage());
          }}
        >
          Concluir
        </Button>
      ) : (
        <Button
          color="primary"
          size="lg"
          onPress={() => {
            setValue("tabs.select", setPage());
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
