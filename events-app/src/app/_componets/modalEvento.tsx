import {
  faBeer,
  faCalendarDays,
  faClock,
  faLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePageContext } from "../pageProvider";
import { parse } from "date-fns";
import calcularIntervaloFormatado from "@/utils/calcularIntervaloHoras";
import Link from "next/link";

const ModalEvento = () => {
  const router = useRouter();

  const { disclousureEvento, disclousureEventoCancelar } = usePageContext();

  const { form } = usePageContext();

  const { isOpen: isOpenEvento, onClose: onCloseEvento } = disclousureEvento;
  const { onOpen: onOpenEventoCancelar } = disclousureEventoCancelar;

  const { watch } = form;

  const { evento } = watch();

  const {
    id,
    foto,
    titulo,
    data,
    endereco,
    numero,
    bairro,
    cidade,
    longitude,
    latitude,
    formulario,
    descricao,
    horaInicio,
    horaFim,
    tipo_participante,
    idade_dependente,
    confirmacao,
  } = evento ?? {};

  const dataAtual = new Date();
  const providedDate = formulario
    ? parse(formulario.end, "dd/MM/yyyy", new Date())
    : new Date();

  const local = endereco + ", " + numero + ", " + bairro + ", " + cidade;

  return (
    <Modal
      size={"5xl"}
      isOpen={isOpenEvento}
      onClose={onCloseEvento}
      scrollBehavior="inside"
      backdrop="blur"
      className="events max-h-[90%]"
      classNames={{ backdrop: "z-[5000]", wrapper: "z-[6000]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody className="max-h-sreen overflow-auto">
              {foto && (
                <div className=" overflow-hidden h-64 flex items-center justify-center rounded-2xl">
                  <Image
                    src={foto.foto}
                    alt="Fundo Evento"
                    className="rounded-2xl"
                  />
                </div>
              )}

              <div className="flex gap-4 flex-col items-start w-full">
                <span className="font-bold text-2xl md:text-2xl text-black">
                  {titulo}
                </span>

                <Divider className="my-1" />

                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size="lg"
                    color="#52b032"
                  />
                  <span className="font-medium text-base  text-black">
                    {data} ás {horaInicio}
                  </span>
                </div>

                {longitude && latitude ? (
                  <Link
                    href={`https://maps.google.com/?q=${latitude},${longitude}`}
                    className="flex items-center gap-3 underline"
                    rel="maps"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size="lg"
                      color="#52b032"
                    />
                    <span className="font-medium text-base  text-black">
                      {local}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size="lg"
                      color="#52b032"
                    />
                    <span className="font-medium text-base  text-black">
                      {local}
                    </span>
                  </div>
                )}

                {descricao && (
                  <>
                    <Divider className="my-1" />

                    <div>
                      <span className="font-medium text-base  text-black">
                        {descricao}
                      </span>
                    </div>
                  </>
                )}

                <Divider className="my-1" />

                <span className="font-bold text-xl md:text-xl text-[#000]">
                  Informações Importantes
                </span>

                <div className="flex flex-wrap items-center justify-start gap-4 h-20">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faClock} size="lg" color="#52b032" />
                    <span className="font-medium text-base text-black">
                      Duração
                      <br />
                      {calcularIntervaloFormatado(horaInicio, horaFim)}
                    </span>
                  </div>

                  {tipo_participante === 3 ||
                    (tipo_participante === 4 && (
                      <>
                        <Divider
                          orientation="vertical"
                          className="mx-1 h-3/4"
                        />

                        <div className="flex items-center gap-4">
                          <FontAwesomeIcon
                            icon={faUsers}
                            size="lg"
                            color="#52b032"
                          />
                          <span className="font-medium text-base text-black">
                            Dependentes
                            <br />
                            até {idade_dependente} anos
                          </span>
                        </div>
                      </>
                    ))}

                  <Divider orientation="vertical" className="mx-1 h-3/4" />

                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faBeer} size="xl" color="#52b032" />
                    <span className="font-medium text-base text-black">
                      Bebidas para
                      <br />
                      maiores de 18 anos
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-row items-end">
              {dataAtual <= providedDate ? (
                confirmacao ? (
                  <>
                    <Button
                      className="bg-warning text-white"
                      onPress={onOpenEventoCancelar}
                    >
                      Não vou mais á festa
                    </Button>
                    <Button
                      className="bg-primary text-white h-14 w-32 text-md"
                      onPress={() => router.push(`/formulario/${id}`)}
                    >
                      Alterar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="bg-warning text-white"
                      onPress={onOpenEventoCancelar}
                    >
                      Não vou á festa
                    </Button>
                    <Button
                      className="bg-primary text-white h-14 w-32 text-md"
                      onPress={() => router.push(`/formulario/${id}`)}
                    >
                      Vou á festa
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Button
                    className="bg-primary text-white h-14 w-32 text-md"
                    onPress={() => router.push(`/formulario/${id}`)}
                    isDisabled={confirmacao}
                  >
                    Visualizar
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEvento;
