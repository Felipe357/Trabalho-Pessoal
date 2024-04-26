"use client";

import { EventoProp, useInicialContext } from "@/provider/provider";
import Evento from "./evento";

import React from "react";

export default function Eventos(): React.ReactNode {
  const { form: formInicial } = useInicialContext();

  const { watch } = formInicial;

  const { eventos } = watch();

  return (
    <>
      {eventos &&
        eventos.map((event: EventoProp) => {
          return <Evento key={event.id} eventProps={event} />;
        })}
    </>
  );
}
