"use client";

import React from "react";

import { PageProvider } from "./pageProvider";
import ModalEvento from "./_componets/modalEvento";
import ModalEventoCancelar from "./_componets/modalEventoCancelar";
import Eventos from "./_componets/eventos";

export default function Home() {
  return (
    <PageProvider>
      <div className="p-6 overflow-hidden w-full flex flex-wrap gap-4">
        <Eventos />
        <ModalEvento />
        <ModalEventoCancelar />
      </div>
    </PageProvider>
  );
}
