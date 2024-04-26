import {
  Button,
  Chip,
  DropdownItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useControleEventoContext } from "../controleEventoProvider";
import ControllerInput from "@/components/form/controllerInput";
import ControllerDropdown from "@/components/form/controllerDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";

const ListaParticipantes = () => {
  const { form } = useControleEventoContext();

  const { control, setValue, watch } = form;

  const { eventoSelect } = watch();

  const { participante } = eventoSelect;

  const [page, setPage] = useState(1);

  const rowsPerPage = 12;

  const [pages, setPages] = useState(
    Math.ceil(participante.length / rowsPerPage)
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return participante.slice(start, end);
  }, [page, participante]);

  const filter = (e: any): JSX.Element | null => {
    const convidado = {
      nome:
        (e.colaborador && e.colaborador.nome_completo) ??
        (e.dependente && e.dependente.nome_completo) ??
        (e.acompanhante && e.acompanhante.nome_completo),
      tipo: e.colaborador ? 0 : e.dependente ? 1 : 2,
    };
    if (
      watch("filter.nome") === "" ||
      convidado.nome.includes(String(watch("filter.nome")).toUpperCase())
    ) {
      return (
        <TableRow key={e.id}>
          <TableCell className="truncate max-w-40 md:max-w-max whitespace-nowrap">
            {convidado.nome}
          </TableCell>
          <TableCell>
            {convidado.tipo === 0 ? (
              <Chip variant="dot" color="primary" className="p-3">
                Colaborador
              </Chip>
            ) : convidado.tipo === 1 ? (
              <Chip variant="dot" color="success" className="p-3">
                Dependente
              </Chip>
            ) : (
              <Chip variant="dot" color="secondary" className="p-3">
                Aconpanhante
              </Chip>
            )}
          </TableCell>
          <TableCell>
            {e.participacao ? (
              <Chip variant="dot" color="primary" className="p-3">
                Sim
              </Chip>
            ) : (
              <Chip variant="dot" color="danger" className="p-3">
                Não
              </Chip>
            )}
          </TableCell>
          <TableCell>
            {e.bebida ? (
              <Chip variant="dot" color="primary" className="p-3">
                Sim
              </Chip>
            ) : (
              <Chip variant="dot" color="danger" className="p-3">
                Não
              </Chip>
            )}
          </TableCell>
          <TableCell>
            {e.transporte ? (
              <Chip variant="dot" color="primary" className="p-3">
                Sim
              </Chip>
            ) : (
              <Chip variant="dot" color="danger" className="p-3">
                Não
              </Chip>
            )}
          </TableCell>
        </TableRow>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4 h-full ">
      <div className="flex flex-row items-center gap-4 w-full">
        <Button
          isIconOnly
          color="primary"
          size="sm"
          onPress={() => {
            setValue("tabs.select", "list");
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <ControllerInput
          inputProps={{
            isClearable: true,
            onClear: () => setValue("filter.nome", ""),
            placeholder: "Buscar por nome...",
            className: "w-full",
            startContent: <FontAwesomeIcon icon={faSearch} />,
          }}
          controllerProps={{ control: control, name: "filter.nome" }}
        />
      </div>

      <div className="flex gap-5 items-center justify-center flex-wrap">
        <ControllerDropdown
          dropdownMenuProps={{
            children: [
              <DropdownItem key={1}>Colaborador</DropdownItem>,
              <DropdownItem key={2}>Dependente</DropdownItem>,
              <DropdownItem key={3}>Acompanhante</DropdownItem>,
            ],
            disallowEmptySelection: true,
            closeOnSelect: false,
            selectionMode: "multiple",
            "aria-label": "Multi Seleção Tipo Participante",
            label: "Tipo Participantes",
          }}
          controllerProps={{
            control: control,
            name: "filter.tipoParticipante",
          }}
        />
        <ControllerDropdown
          dropdownMenuProps={{
            children: [
              <DropdownItem key={1}>Sim</DropdownItem>,
              <DropdownItem key={2}>Não</DropdownItem>,
            ],
            disallowEmptySelection: true,
            closeOnSelect: false,
            selectionMode: "multiple",
            "aria-label": "Multi Seleção Participação",
            label: "Participação",
          }}
          controllerProps={{
            control: control,
            name: "filter.participacao",
          }}
        />
        <ControllerDropdown
          dropdownMenuProps={{
            children: [
              <DropdownItem key={1}>Sim</DropdownItem>,
              <DropdownItem key={2}>Não</DropdownItem>,
            ],
            disallowEmptySelection: true,
            closeOnSelect: false,
            selectionMode: "multiple",
            "aria-label": "Multi Seleção Bebida",
            label: "Bebida",
          }}
          controllerProps={{
            control: control,
            name: "filter.bebida",
          }}
        />
        <ControllerDropdown
          dropdownMenuProps={{
            children: [
              <DropdownItem key={1}>Sim</DropdownItem>,
              <DropdownItem key={2}>Não</DropdownItem>,
            ],
            disallowEmptySelection: true,
            closeOnSelect: false,
            selectionMode: "multiple",
            "aria-label": "Multi Seleção Trânsporte",
            label: "Trânsporte",
          }}
          controllerProps={{
            control: control,
            name: "filter.transporte",
          }}
        />
      </div>

      <Table
        aria-label="Example static collection table"
        classNames={{
          base: "overflow-y-scroll max-h-full",
        }}
        isHeaderSticky
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Convidado</TableColumn>
          <TableColumn>Participação</TableColumn>
          <TableColumn>Bebida</TableColumn>
          <TableColumn>Trânsporte</TableColumn>
        </TableHeader>
        <TableBody>
          {items &&
            items.map((e: any) => {
              return filter(e);
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaParticipantes;
