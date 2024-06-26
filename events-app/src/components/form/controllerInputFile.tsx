import { Input, type InputProps } from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  inputProps?: InputProps;
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerInputFile = (params: Props) => {
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
            classNames={{
              inputWrapper: `min-h-14 ${
                field.value && "border-primary"
              } data-[hover=true]:border-[#52b032] gap-2`,
              description: "text-red-700",
              label: "font-bold",
            }}
            onChange={(e) =>
              field.onChange({
                name: e.target.files?.[0].name,
                foto: e.target.files?.[0],
              })
            }
          />
        );
      }}
    />
  );
};

export default ControllerInputFile;
