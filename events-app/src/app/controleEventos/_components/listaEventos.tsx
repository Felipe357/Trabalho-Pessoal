import {
  faBars,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Chip,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useControleEventoContext } from "../controleEventoProvider";

const ListaEventos = () => {
  const { evento } = useControleEventoContext();

  const participantes = [
    "Colaboradores",
    "Acompanhnates",
    "Dependentes",
    "Todos",
  ];

  const colorParticipante = ["#D4D4D866", "#F45302", "#345eeb", "#3E7E28"];

  return (
    <div className="border-2 rounded-2xl border-[#eee] p-8 w-full h-full overflow-y-auto">
      <Table
        removeWrapper
        aria-label="Example static collection table"
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn>Título</TableColumn>
          <TableColumn>Data</TableColumn>
          <TableColumn>Horário</TableColumn>
          <TableColumn>Tipo Participantes</TableColumn>
          <TableColumn>Idade Dependente</TableColumn>
          <TableColumn>Formulário Início</TableColumn>
          <TableColumn>Formulário Fim</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Nenhum evento encontrado">
          {evento &&
            evento.map((e) => {
              return (
                <TableRow key={e.id}>
                  <TableCell>{e.titulo}</TableCell>
                  <TableCell>{e.data}</TableCell>
                  <TableCell>{e.hora}</TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Chip
                      radius="lg"
                      variant="flat"
                      style={{
                        backgroundColor: colorParticipante[e.tipoConvidado - 1],
                        color: e.tipoConvidado === 1 ? "#000" : "#FFF",
                      }}
                      className="w-full !max-w-96 text-center h-8"
                    >
                      {participantes[e.tipoConvidado - 1]}
                    </Chip>
                  </TableCell>
                  <TableCell>{e.idadeDependente}</TableCell>
                  <TableCell>{e.dataFormularioInicio}</TableCell>
                  <TableCell>{e.dataFormularioFim}</TableCell>
                  <TableCell>
                    <Chip radius="sm" variant="flat">
                      Teste
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Popover placement="right">
                      <PopoverTrigger>
                        <Button isIconOnly variant="light" radius="full">
                          <FontAwesomeIcon icon={faBars} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="w-full max-w-[260px] px-1 py-2">
                          <Listbox variant="flat" aria-label="Lista de opções">
                            <ListboxItem
                              key="view"
                              description="Listagem de Participantes"
                              startContent={<FontAwesomeIcon icon={faEye} />}
                            >
                              Visualizar
                            </ListboxItem>
                            <ListboxItem
                              key="edit"
                              showDivider
                              description="Editar Evento"
                              startContent={<FontAwesomeIcon icon={faEdit} />}
                            >
                              Editar
                            </ListboxItem>
                            <ListboxItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              description="Deletar Permanentemente o Evento"
                              startContent={<FontAwesomeIcon icon={faTrash} />}
                            >
                              Deletar
                            </ListboxItem>
                          </Listbox>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaEventos;
