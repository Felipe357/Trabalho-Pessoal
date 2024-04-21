import {
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupProps,
} from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  checkboxGroupProps: CheckboxGroupProps & {
    data: Array<any>;
  };
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerCheckboxGroup = (params: Props) => {
  const { controllerProps, checkboxGroupProps } = params;

  return (
    <Controller
      {...controllerProps}
      name={controllerProps.name}
      render={({ field }) => {
        return (
          <CheckboxGroup
            {...checkboxGroupProps}
            value={field.value}
            onValueChange={field.onChange}
            orientation="horizontal"
            className=" border- border-default-400"
            classNames={{
              label: "font-bold text-black",
              wrapper: "gap-x-10 border-medium rounded-xl p-4"
            }}
          >
            {checkboxGroupProps.data.map((c) => {
              return (
                <Checkbox key={c.id} value={c.value}>
                  {c.label}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        );
      }}
    />
  );
};

export default ControllerCheckboxGroup;
