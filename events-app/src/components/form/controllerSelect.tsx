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
              trigger: "h-14",
              label: "font-bold text-xl top-[45%]",
            }}
          ></Select>
        );
      }}
    />
  );
};

export default ControllerInput;
