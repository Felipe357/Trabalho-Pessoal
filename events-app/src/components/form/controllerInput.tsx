import { Input, type InputProps } from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  inputProps?: InputProps;
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerInput = (params: Props) => {
  const { inputProps } = params;

  return (
    <Controller
      {...params.controllerProps}
      name={params.controllerProps.name}
      render={({ field }) => {
        return (
          <Input
            {...inputProps}
            variant="bordered"
            defaultValue={field.value}
            classNames={{
              inputWrapper: `h-14 ${
                field.value && "border-primary"
              } data-[hover=true]:border-[#3E7E28] gap-2`,
              description: "text-red-700",
              label: "font-bold text-xl top-[45%]",
            }}
            onChange={(e) => field.onChange(e.target.value)}
          />
        );
      }}
    />
  );
};

export default ControllerInput;
