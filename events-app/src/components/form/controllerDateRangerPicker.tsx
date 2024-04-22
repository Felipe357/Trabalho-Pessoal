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
  RangeCalendar,
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

const ControllerDateRangerPicker = (params: Props) => {
  const { controllerProps } = params;

  return (
    <Controller
      {...controllerProps}
      name={controllerProps.name}
      render={({ field }) => {
        return (
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Input
                isReadOnly
                isRequired
                label="Período de Confirmação"
                labelPlacement="outside"
                className="w-72"
                variant="bordered"
                value={
                  field.value
                    ? `${field.value.start} - ${field.value.end}`
                    : "Selecione o período de confirmação"
                }
                endContent={
                  <FontAwesomeIcon icon={faCalendar} color="#3E7E28" />
                }
                classNames={{
                  inputWrapper: `h-14 mt-1 ${
                    field.value && "border-primary"
                  } data-[hover=true]:border-[#3E7E28] gap-2`,
                  description: "text-red-700",
                  label: "font-bold",
                  input: "text-start cursor-pointer",
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <I18nProvider>
                <RangeCalendar
                  minValue={today(getLocalTimeZone())}
                  // maxValue={}
                  color="primary"
                  classNames={{
                    base: "events",
                  }}
                  onChange={(e) =>
                    field.onChange({
                      start: format(
                        e.start.toDate(getLocalTimeZone()),
                        "dd/MM/yyyy"
                      ),
                      end: format(
                        e.end.toDate(getLocalTimeZone()),
                        "dd/MM/yyyy"
                      ),
                    })
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

export default ControllerDateRangerPicker;
