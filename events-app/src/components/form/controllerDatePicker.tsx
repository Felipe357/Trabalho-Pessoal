import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Popover,
  type CalendarProps,
  PopoverTrigger,
  Button,
  PopoverContent,
  Calendar,
  Input,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { format } from "date-fns";
import React from "react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

interface Props {
  calendarProps?: CalendarProps;
  controllerProps: Omit<UseControllerProps, "control"> & {
    control: Control<any>;
  };
}

const ControllerDatePicker = (params: Props) => {
  const { controllerProps } = params;

  return (
    <Controller
      {...controllerProps}
      name={controllerProps.name}
      render={({ field }) => {
        return (
          <Popover placement="right">
            <PopoverTrigger>
              <Input
                isReadOnly
                isRequired
                label="Data Evento"
                labelPlacement="outside"
                className="w-64"
                variant="bordered"
                value={field.value ?? "Selecione a data do evento"}
                endContent={
                  <FontAwesomeIcon icon={faCalendar} color="#3E7E28" />
                }
                classNames={{
                  inputWrapper: `h-14 ${
                    field.value && "border-primary"
                  } data-[hover=true]:border-[#3E7E28] gap-2`,
                  description: "text-red-700",
                  label: "font-bold text-xl top-[45%]",
                  input: "text-start cursor-pointer",
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <I18nProvider>
                <Calendar
                  minValue={today(getLocalTimeZone())}
                  color="primary"
                  classNames={{
                    base: "events",
                  }}
                  onChange={(e) =>
                    field.onChange(
                      format(e.toDate(getLocalTimeZone()), "dd/MM/yyyy")
                    )
                  }
                />
              </I18nProvider>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};

export default ControllerDatePicker;
