"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
    <div className="flex flex-row justify-end items-center gap-4 w-full md:m-6">
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
    </div>
  );
};

export default NovoEventoFooter;
