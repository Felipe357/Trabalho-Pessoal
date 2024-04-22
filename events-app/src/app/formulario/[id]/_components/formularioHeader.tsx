"use client";

import React from "react";
import { useFomrularioContext } from "../formularioProvider";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const FormularioHeader = () => {
  const { evento } = useFomrularioContext();

  const router = useRouter();

  return (
    <div className="flex flex-row items-center gap-4 w-full md:mx-3">
      <Button
        isIconOnly
        radius="full"
        color="primary"
        size="sm"
        onPress={() => router.replace("/")}
      >
        <FontAwesomeIcon icon={faChevronLeft} color="#FFF" size="1x" />
      </Button>
      <span className="font-bold text-2xl">{evento?.titulo}</span>
    </div>
  );
};

export default FormularioHeader;
