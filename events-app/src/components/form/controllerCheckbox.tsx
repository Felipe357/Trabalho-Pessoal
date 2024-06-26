import { Checkbox, type CheckboxProps } from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  checkBoxProps: CheckboxProps;
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerCheckbox = (params: Props) => {
  const { controllerProps, checkBoxProps } = params;

  return (
    <Controller
      {...controllerProps}
      name={controllerProps.name}
      render={({ field }) => {
        return (
          <Checkbox
            {...checkBoxProps}
            isSelected={field.value}
            className="h-14 m-0"
            classNames={{
              label: "font-bold ",
              wrapper: "h-6 w-6",
            }}
            onValueChange={(e) => field.onChange(e)}
          >
            {checkBoxProps.title}
          </Checkbox>
        );
      }}
    />
  );
};

export default ControllerCheckbox;
