"use client";

import { usePageContext } from "../pageProvider";
import Evento from "./evento";

import React from "react";

export default function Eventos(): React.ReactNode {
  const { evento } = usePageContext();

  return (
    <>
      {evento.map((event) => {
        return <Evento key={event.id} eventProps={event} />;
      })}
    </>
  );
}
