import { Textarea, type TextAreaProps } from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  textAreaProps?: TextAreaProps;
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerTextArea = (params: Props) => {
  const { textAreaProps } = params;

  return (
    <Controller
      {...params.controllerProps}
      name={params.controllerProps.name}
      render={({ field }) => {
        return (
          <Textarea
            {...textAreaProps}
            variant="bordered"
            defaultValue={field.value}
            classNames={{
              inputWrapper: `min-h-14 ${
                field.value && "border-primary"
              } data-[hover=true]:border-[#52b032] gap-2`,
              description: "text-red-700",
              label: "font-bold",
            }}
            onChange={(e) => field.onChange(e.target.value)}
          />
        );
      }}
    />
  );
};

export default ControllerTextArea;
