"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const NovoEventoHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center gap-4 w-full md:m-6">
      <Button
        isIconOnly
        radius="full"
        color="primary"
        size="sm"
        onPress={() => router.replace("/controleEventos")}
      >
        <FontAwesomeIcon icon={faChevronLeft} color="#FFF" size="1x" />
      </Button>
      <span className="font-bold text-2xl">Cadastro de Evento</span>
    </div>
  );
};

export default NovoEventoHeader;
