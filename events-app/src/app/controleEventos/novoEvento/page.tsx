"use client";

import { Tab, Tabs } from "@nextui-org/react";
import NovoEventoHeader from "./_components/novoEventoHeader";
import FormularioEvento from "./_components/formularioEvento";
import { NovoEventoProvider } from "./novoEventoProvider";

const NovoEvento = () => {
  return (
    <NovoEventoProvider>
      <div className="p-6 overflow-hidden w-full h-full flex flex-wrap items-start">
        <NovoEventoHeader />

        <div className=" w-full h-5/6 md:mx-10 p-6 md:p-10 border-[#eeeeee] rounded-2xl border-2">
          <Tabs
            aria-label="Options"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-max px-0 h-12",
              tabContent:
                "group-data-[selected=true]:text-primary text-xl font-bold px-4",
            }}
          >
            <Tab key="event" title="Evento">
              <FormularioEvento />
            </Tab>

            <Tab key="bracelet" title="Pulseira"></Tab>

            <Tab key="fields" title="Campos"></Tab>
          </Tabs>
        </div>
      </div>
    </NovoEventoProvider>
  );
};

export default NovoEvento;
