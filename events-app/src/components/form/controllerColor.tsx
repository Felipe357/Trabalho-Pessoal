import { Control, Controller, UseControllerProps } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useNovoEventoContext } from "@/app/controleEventos/novoEvento/novoEventoProvider";
import { useEffect, useState } from "react";

interface Props {
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerColor = (params: Props) => {
  const { controllerProps } = params;

  return (
    <Controller
      {...controllerProps}
      name={controllerProps.name}
      render={({ field }) => {
        return (
          <Popover placement="right" showArrow={true}>
            <PopoverTrigger>
              <Button
                variant="bordered"
                className="h-14 mt-[-4px] data-[hover=true]:border-[#52b032] "
                endContent={
                  <div
                    className={`h-6 w-6 rounded-md`}
                    style={{ backgroundColor: field.value ?? "#EEE" }}
                  ></div>
                }
              >
                Selecione uma cor
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <HexColorPicker color={field.value} onChange={field.onChange} />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};

export default ControllerColor;
