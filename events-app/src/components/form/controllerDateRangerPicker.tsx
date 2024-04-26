import { useNovoEventoContext } from "@/app/controleEventos/novoEvento/novoEventoProvider";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocalTimeZone, today, fromDate } from "@internationalized/date";
import {
  Popover,
  type CalendarProps,
  PopoverTrigger,
  PopoverContent,
  Input,
  RangeCalendar,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { format, parse } from "date-fns";
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

  const { form } = useNovoEventoContext();

  const { watch } = form;

  let originalDate =
    watch("novoEvento.data") &&
    parse(watch("novoEvento.data"), "dd/MM/yyyy", new Date());

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
                  <FontAwesomeIcon icon={faCalendar} color="#52b032" />
                }
                classNames={{
                  inputWrapper: `h-14 mt-1 ${
                    field.value && "border-primary"
                  } data-[hover=true]:border-[#52b032] gap-2`,
                  description: "text-red-700",
                  label: "font-bold",
                  input: "text-start cursor-pointer",
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <I18nProvider>
                <RangeCalendar
                  minValue={
                    field.value && field.value.start
                      ? fromDate(
                          parse(field.value.start, "dd/MM/yyyy", new Date()),
                          getLocalTimeZone()
                        )
                      : today(getLocalTimeZone())
                  }
                  maxValue={
                    originalDate && fromDate(originalDate, getLocalTimeZone())
                  }
                  defaultValue={
                    field.value && {
                      start: fromDate(
                        parse(field.value.start, "dd/MM/yyyy", new Date()),
                        getLocalTimeZone()
                      ),
                      end: fromDate(
                        parse(field.value.end, "dd/MM/yyyy", new Date()),
                        getLocalTimeZone()
                      ),
                    }
                  }
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
