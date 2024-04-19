import { Select, type SelectProps } from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  selectProps: SelectProps;
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerInput = (params: Props) => {
  const { selectProps } = params;

  return (
    <Controller
      {...params.controllerProps}
      name={params.controllerProps.name}
      render={({ field }) => {
        return (
          <Select
            {...selectProps}
            onSelectionChange={(e) => field.onChange((e as any).anchorKey)}
            classNames={{
              trigger: `h-14 ${
                field.value && "border-primary"
              } data-[hover=true]:border-primary group-data-[focus=true]:border-primary`,
              label: "font-bold",
            }}
          ></Select>
        );
      }}
    />
  );
};

export default ControllerInput;
