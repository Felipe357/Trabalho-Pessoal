import {
  Dropdown,
  type DropdownMenuProps,
  DropdownTrigger,
  Button,
  DropdownMenu,
} from "@nextui-org/react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  dropdownMenuProps: DropdownMenuProps & {
    label: string;
  };
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerDropdown = (params: Props) => {
  const { controllerProps, dropdownMenuProps } = params;

  return (
    <Controller
      {...controllerProps}
      name={controllerProps.name}
      render={({ field }) => {
        return (
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="bordered"
                className={`w-40 h-14 justify-start border-[#52b032]`}
              >
                {dropdownMenuProps.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              {...dropdownMenuProps}
              selectedKeys={field.value}
              onSelectionChange={field.onChange}
            >
              {dropdownMenuProps.children}
            </DropdownMenu>
          </Dropdown>
        );
      }}
    />
  );
};

export default ControllerDropdown;
