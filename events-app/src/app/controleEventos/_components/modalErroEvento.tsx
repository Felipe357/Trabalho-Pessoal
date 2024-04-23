import {
  Button,
  DropdownItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ModalParticipantesEvento = () => {
  const { disclosureParticipantesEvento, form } = useControleEventoContext();

  const { isOpen, onClose } = disclosureParticipantesEvento;

  const { control, setValue, watch } = form;

  const { eventoSelect } = watch();

  return (
    <Modal
      size={"5xl"}
      isOpen={isOpen}
      onClose={() => {
        setValue("eventoSelect", {
          titulo: "Nenhum Evento Selecionado",
        });
        onClose();
      }}
      backdrop="blur"
      placement="center"
      className="events h-5/6"
      classNames={{ backdrop: "z-[600000]", wrapper: "z-[700000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{eventoSelect.titulo}</ModalHeader>
            <ModalBody className="text-center max-h-[80%]">
              <div className="flex flex-row gap-5 items-center justify-start flex-wrap">
                <ControllerInput
                  inputProps={{
                    isClearable: true,
                    onClear: () => setValue("filter.nome", ""),
                    placeholder: "Buscar por nome...",
                    className: "w-68",
                    startContent: <FontAwesomeIcon icon={faSearch} />,
                  }}
                  controllerProps={{ control: control, name: "filter.nome" }}
                />
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
                classNames={{
                  base: "max-h-[90%] overflowy-y-scroll",
                }}
                isHeaderSticky
              >
                <TableHeader>
                  <TableColumn>Tipo</TableColumn>
                  <TableColumn>Nome Participante</TableColumn>
                  <TableColumn>Participação</TableColumn>
                  <TableColumn>Consumo de alcool</TableColumn>
                  <TableColumn>Trânsporte</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Nenhum participante respondeu o formulário!">
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                  <TableRow key={"ksnd"}>
                    <TableCell>sdasd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                    <TableCell>asd</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-primary text-white"
                onPress={() => {
                  onClose();
                }}
              >
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalParticipantesEvento;
