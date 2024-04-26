import { Tab, Tabs } from "@nextui-org/react";
import ListaEventos from "./listaEventos";
import { Controller } from "react-hook-form";
import { useControleEventoContext } from "../controleEventoProvider";
import ListaParticipantes from "./listaParticipantes";

const TabsListagemEventos = () => {
  const { form } = useControleEventoContext();

  const { control } = form;

  return (
    <Controller
      control={control}
      name={"tabs.select"}
      render={({ field }: any) => {
        return (
          <div className="shadow-large border-2 rounded-2xl border-[#eee] px-4 w-full h-full">
            <div className="flex w-full flex-col h-full">
              <Tabs
                aria-label="Controller"
                classNames={{
                  panel: "h-full",
                  tabList: "invisible h-0",
                }}
                selectedKey={field.value}
                onSelectionChange={field.onChange}
              >
                <Tab key="list" title="Lista Eventos">
                  <ListaEventos />
                </Tab>
                <Tab key="participants" title="Lista Participantes">
                  <ListaParticipantes />
                </Tab>
              </Tabs>
            </div>
          </div>
        );
      }}
    />
  );
};

export default TabsListagemEventos;
