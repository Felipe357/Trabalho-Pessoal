"use client";

import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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

import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import pt from "date-fns/locale/pt-BR";
import { format } from "date-fns";

type Teste = {
  key: string;
  id: string;
  cliente: string;
  quantidade: string;
  dataentrega: string;
  produtos: Teste2[];
};

type Teste2 = {
  cod: string;
  produto: string;
  quantidade: number;
  quantidadeEmbalagem: number;
};

const rowsConst: Teste[] = [
  {
    key: "1",
    id: "008939",
    cliente: "Felipe Serra",
    quantidade: "10",
    dataentrega: "19/03/2024",
    produtos: [
      {
        cod: "MAA10254",
        produto: "Amaryles",
        quantidade: 10,
        quantidadeEmbalagem: 1,
      },
    ],
  },
  {
    key: "3",
    id: "008939",
    cliente: "Felipe Serra",
    quantidade: "10",
    dataentrega: "19/03/2024",
    produtos: [
      {
        cod: "MBB20258",
        produto: "Begônia",
        quantidade: 15,
        quantidadeEmbalagem: 1,
      },
      {
        cod: "MCC30259",
        produto: "Crisântemo",
        quantidade: 20,
        quantidadeEmbalagem: 1,
      },
      {
        cod: "MDD40260",
        produto: "Dália",
        quantidade: 12,
        quantidadeEmbalagem: 1,
      },
    ],
  },
  {
    key: "4",
    id: "008939",
    cliente: "Felipe Serra",
    quantidade: "10",
    dataentrega: "19/03/2024",
    produtos: [
      {
        cod: "MII90265",
        produto: "Íris",
        quantidade: 9,
        quantidadeEmbalagem: 1,
      },
      {
        cod: "MJJ100266",
        produto: "Jasmim",
        quantidade: 22,
        quantidadeEmbalagem: 1,
      },
    ],
  },
  {
    key: "2",
    id: "000000",
    cliente: "Felipe Serra Page 2",
    quantidade: "10",
    dataentrega: "24/03/2024",
    produtos: [
      {
        cod: "MEE50261",
        produto: "Eucalipto",
        quantidade: 8,
        quantidadeEmbalagem: 1,
      },
      {
        cod: "MFF60262",
        produto: "Ficus",
        quantidade: 25,
        quantidadeEmbalagem: 1,
      },
      {
        cod: "MGG70263",
        produto: "Gérbera",
        quantidade: 18,
        quantidadeEmbalagem: 1,
      },
      {
        cod: "MHH80264",
        produto: "Hortênsia",
        quantidade: 30,
        quantidadeEmbalagem: 1,
      },
    ],
  },
];

export default function Home() {
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState(rowsConst);
  const [rowsPerPage, setRowsPerPage] = useState<string>("5");
  const [date, setdate] = useState<Date | null>(new Date());
  const [rowSelect, setRowSelect] = useState<Teste>({
    key: "1",
    id: "008939",
    cliente: "Felipe Serra",
    quantidade: "10",
    dataentrega: "19/03/2024",
    produtos: [
      {
        cod: "MAA10254",
        produto: "Amaryles",
        quantidade: 10,
        quantidadeEmbalagem: 1,
      },
    ],
  });
  const [step, setStep] = useState(0);

  const pages = Math.ceil(rows.length / parseInt(rowsPerPage));

  const [isOpen, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = (key: string | number | bigint) => {
    setStep(0);
    setRowSelect(rowsConst.find((row) => row.key === key)!);
    setOpen(true);
  };

  const items = React.useMemo(() => {
    const start = (page - 1) * parseInt(rowsPerPage);
    const end = start + parseInt(rowsPerPage);

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  useEffect(() => {
    setRows(
      rowsConst.filter(
        (filter) => format(date as Date, "dd/MM/yyyy") === filter.dataentrega
      )
    );
  }, [date]);

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
                "&:hover > fieldset": { borderColor: "#4ca702" },
                height: "48px",
                borderRadius: "16px",
              },
              "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ":
                {
                  borderColor: "#4ca702",
                },
            }}
            defaultValue={new Date()}
            className="input-data"
            minDate={new Date()}
            onChange={(newValue) => setdate(newValue)}
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
            th: "bg-[#4ca702] text-white",
          }}
          onRowAction={(key) => onOpen(key)}
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
        <span></span>
        <div className="w-full flex flex-row justify-between items-center px-10">
          <div className="flex gap-2 flex-row items-center">
            <span>Mostrar: </span>
            <Select
              aria-label="Quantidade Por Página"
              className="w-32"
              items={[{ name: "5" }, { name: "10" }]}
              defaultSelectedKeys={["5"]}
              variant="bordered"
              color="primary"
              selectionMode="single"
              onChange={(change) => setRowsPerPage(change.target.value)}
              disallowEmptySelection={true}
              classNames={{
                trigger:
                  "border border-[#4ca702] data-[hover=true]:hover:border-[#4ca702] data-[hover=true]:hover:border-2",
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md",
                    "transition-opacity",
                    "data-[selectable=true]:focus:bg-[#4ca702]",
                    "data-[pressed=true]:opacity-70",
                    "data-[selectable=true]:focus:text-[#FFF]",
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
                <SelectItem
                  key={item.name}
                  value={item.name}
                  className="capitalize"
                >
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

      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between pr-10">
                {rowSelect.id} - {rowSelect.cliente}
              </ModalHeader>
              <ModalBody>
                <Table
                  isHeaderSticky
                  shadow="none"
                  aria-label="Example table"
                  selectionMode="single"
                  classNames={{
                    th: "bg-[#4ca702] text-white",
                  }}
                  onRowAction={(key) => onOpen(key)}
                >
                  <TableHeader>
                    <TableColumn key={"cod"}>Cod. Produto</TableColumn>
                    <TableColumn key={"produto"}>Produto</TableColumn>
                    <TableColumn key={"quantidade"}>Qtd. Produtos</TableColumn>
                    <TableColumn key={"quantidadeEmbalagem"}>
                      Qtd. Por Embalagem
                    </TableColumn>
                  </TableHeader>
                  <TableBody
                    items={rowSelect.produtos}
                    emptyContent="Nenhum cliente encontrado"
                  >
                    {(item) => (
                      <TableRow key={item.cod}>
                        {(columnKey) => (
                          <TableCell className=" text-xs">
                            {getKeyValue(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Ação
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
