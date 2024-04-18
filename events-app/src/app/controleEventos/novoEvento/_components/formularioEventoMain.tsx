import { Tab, Tabs } from "@nextui-org/react";
import FormularioEvento from "./Evento/formularioEvento";
import { useNovoEventoContext } from "../novoEventoProvider";
import { Controller } from "react-hook-form";
import NovoEventoFooter from "./novoEventoFooter";
import FormularioLocal from "./Local/formularioLocal";

const NovoEventoMain = () => {
  const { form } = useNovoEventoContext();

  const { control } = form;

  return (
    <Controller
      control={control}
      name={"tabs.select"}
      render={({ field }) => {
        return (
          <div className=" w-2/4 h-5/6 md:mx-10 p-6 md:p-10 border-[#eeeeee] rounded-2xl border-2">
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
              selectedKey={field.value}
              onSelectionChange={field.onChange}
            >
              <Tab key="event" title="Evento" className="h-full">
                <FormularioEvento />
              </Tab>

              <Tab key="location" title="Local" className="h-full">
                <FormularioLocal />
              </Tab>

              <Tab key="bracelet" title="Pulseira" className="h-full">
                <NovoEventoFooter />
              </Tab>

              <Tab key="fields" title="Campos" className="h-full">
                <NovoEventoFooter />
              </Tab>
            </Tabs>
          </div>
        );
      }}
    />
  );
};

export default NovoEventoMain;
