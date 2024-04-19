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

  const { form } = useNovoEventoContext();

  const { watch } = form;

  const { pulseira } = watch();

  const [color, setColor] = useState(pulseira.color);

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    setColor(pulseira.color);
  }, [pulseira.color]);

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
                className="h-14 mt-[-4px] data-[hover=true]:border-[#3E7E28] "
                endContent={
                  <div
                    className={`h-6 w-6 rounded-md`}
                    style={{ backgroundColor: color }}
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
