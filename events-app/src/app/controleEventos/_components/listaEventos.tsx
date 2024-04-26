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
} from "@nextui-org/react";
import { useControleEventoContext } from "../controleEventoProvider";
import { useInicialContext, type EventoProp } from "@/provider/provider";
import { useRouter } from "next/navigation";
import { somarArray } from "@/utils/somarArray";

const ListaEventos = () => {
  const { form: formControle } = useControleEventoContext();
  const { form } = useInicialContext();

  const { setValue: setValueInicial } = form;
  const { setValue, watch } = formControle;
  const { eventos } = watch();

  const participantes = [
    "Colaboradores",
    "Acompanhnates",
    "Dependentes",
    "Todos",
  ];

  const participantesCor = ["warning", "success", "secondary", "primary"];

  const router = useRouter();

  return (
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
        <TableColumn>Formulário</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Nenhum evento encontrado">
        {eventos &&
          eventos.map((e: EventoProp) => {
            return (
              <TableRow key={e.id}>
                <TableCell className="truncate max-w-40 md:max-w-max whitespace-nowrap">
                  {e.titulo}
                </TableCell>
                <TableCell>{e.data}</TableCell>
                <TableCell>{e.horaInicio}</TableCell>
                <TableCell>
                  <Chip
                    variant="dot"
                    color={
                      participantesCor[
                        somarArray(e.tipo_participante)
                      ] as unknown as undefined
                    }
                  >
                    {participantes[somarArray(e.tipo_participante)]}
                  </Chip>
                </TableCell>
                <TableCell>
                  {e.formulario.start} á {e.formulario.end}
                </TableCell>
                <TableCell>
                  {e.status ? (
                    <Chip variant="dot" color="primary">
                      Ativo
                    </Chip>
                  ) : (
                    <Chip variant="dot" color="danger">
                      Inativo
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <Popover placement="left">
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
                            onPress={() => {
                              setValue("eventoSelect", e);
                              setValue("filter.nome", "");
                              setValue("tabs.select", "participants");
                            }}
                          >
                            Visualizar
                          </ListboxItem>
                          <ListboxItem
                            key="edit"
                            showDivider
                            description="Editar Evento"
                            startContent={<FontAwesomeIcon icon={faEdit} />}
                            onPress={() => {
                              setValueInicial("eventoSelect", e);
                              router.push(`/controleEventos/novoEvento`);
                            }}
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
  );
};

export default ListaEventos;
