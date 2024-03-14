"use client";

import React, { useMemo, useState } from "react";

import {
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import pt from "date-fns/locale/pt-BR";

const rows = [
  {
    key: "1",
    id: "008939",
    cliente: "Felipe Serra",
    quantidade: "10",
    dataentrega: "04/03/24",
  },
  {
    key: "2",
    id: "008939",
    cliente: "Felipe Serra Page 2",
    quantidade: "10",
    dataentrega: "04/03/24",
  },
];

export default function Home() {
  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rowsPerPage]);

  return (
    <div className="px-10 flex flex-col gap-2 flex-1">
      <div className="flex flex-1 items-center justify-between">
        <span className="text-xl font-bold">Tranzações Gerais</span>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
          <DatePicker
            slotProps={{
              textField: {
                color: "primary",
              },
            }}
            sx={{
              width: "224px",
              "& .MuiOutlinedInput-root": {
                "&:hover > fieldset": { borderColor: "#BFD1FF" },
                height: "48px",
                borderRadius: "16px",
              },
              "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ":
                {
                  borderColor: "#BFD1FF",
                },
            }}
            defaultValue={new Date()}
            className="input-data"
            minDate={new Date()}
            onChange={(newValue) => console.log(newValue)}
          />
        </LocalizationProvider>
      </div>

      <div className="border border-[#0000003B] rounded-2xl h-[80vh] pb-4 flex flex-col justify-between">
        <Table
          isHeaderSticky
          shadow="none"
          aria-label="Example table"
          selectionMode="single"
          classNames={{
            th: "bg-[#BFD1FF] text-black",
          }}
        >
          <TableHeader>
            <TableColumn key={"id"}>Id</TableColumn>
            <TableColumn key={"cliente"}>Cliente</TableColumn>
            <TableColumn key={"quantidade"}>Qtd. Produtos</TableColumn>
            <TableColumn key={"dataentrega"}>Data Entrega</TableColumn>
          </TableHeader>
          <TableBody items={items} emptyContent="Nenhum cliente encontrado">
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell className=" text-xs">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="w-full flex flex-row justify-between items-center px-10">
          <div className="flex gap-2 flex-row items-center">
            <span>Mostrar: </span>
            <Select
              className="w-32"
              items={[{ name: "1" }, { name: "2" }]}
              defaultSelectedKeys={["1"]}
              variant="bordered"
              color="primary"
              selectionMode="single"
              // onSelectionChange={setRowsPerPage}
              disallowEmptySelection={true}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md",
                    "transition-opacity",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-[#BFD1FF]",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  content: "p-2 border-small border-divider bg-[#FCFDF6]",
                },
              }}
            >
              {(item) => (
                <SelectItem key={item.name} className="capitalize">
                  {item.name}
                </SelectItem>
              )}
            </Select>
          </div>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
