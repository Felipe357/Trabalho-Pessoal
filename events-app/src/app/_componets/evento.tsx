import { Button, Chip, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { usePageContext } from "../pageProvider";
import { parse } from "date-fns";
import { type EventoProp } from "@/providers/client.providers/evento.client.provider";

type EventoProps = {
  eventProps: EventoProp;
};

const Evento = ({ eventProps }: EventoProps) => {
  const {
    foto_base64,
    titulo,
    data,
    endereco,
    numero,
    bairro,
    cidade,
    formulario,
    confirmacao,
  } = eventProps;

  const dataAtual = new Date();
  const providedDate = parse(formulario.end, "dd/MM/yyyy", new Date());

  const local = endereco + ", " + numero + ", " + bairro + ", " + cidade;

  const [maxLength, setMaxLength] = useState(45);
  const [truncatedLocal, setTruncatedLocal] = useState(local);

  useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth < 768 ? 38 : 45);
    };

    updateMaxLength();

    window.addEventListener("resize", updateMaxLength);

    return () => {
      window.removeEventListener("resize", updateMaxLength);
    };
  }, []);

  if (local.length > maxLength) {
    const truncated = local.slice(0, maxLength - 3) + "...";

    if (truncated !== truncatedLocal) setTruncatedLocal(truncated);
  }

  const { disclousureEvento, form } = usePageContext();

  const { onOpen } = disclousureEvento;
  const { setValue } = form;

  return (
    <Button
      isIconOnly
      className="w-full h-full bg-transparent border border-default-300 max-w-[620px] min-h-[380px] flex flex-col justify-between overflow-hidden rounded-3xl"
      onPress={() => {
        onOpen();
        setValue("evento", eventProps);
      }}
    >
      <div className="max-h-32 w-full flex items-center justify-center mt-8">
        {foto_base64 && (
          <Image
            width={300}
            alt="NextUI hero Image"
            src={
              foto_base64 === undefined
                ? ""
                : `data:image/.png;base64,${foto_base64}`
            }
          />
        )}
      </div>
      <div className="h-full w-full top-0 p-4 md:p-6 flex flex-col justify-between items-start">
        <span className="text-xl md:text-2xl font-semibold text-black mix-blend-screen whitespace-normal">
          {titulo}
        </span>
        <div className="w-full flex flex-wrap gap-y-2 justify-between items-end">
          <div className="flex flex-col justify-start items-start gap-2">
            <Chip
              startContent={<FontAwesomeIcon icon={faCalendarDays} />}
              variant="light"
              className="h-8 gap-2"
            >
              {data}
            </Chip>
            <Chip
              startContent={<FontAwesomeIcon icon={faLocationDot} />}
              variant="light"
              className="h-8 gap-2"
            >
              {truncatedLocal}
            </Chip>
            {dataAtual <= providedDate ? (
              <Chip
                startContent={<FontAwesomeIcon icon={faCalendarCheck} />}
                variant="light"
                className="h-8 gap-2"
              >
                Confirmar até {formulario.end}
              </Chip>
            ) : (
              <Chip
                startContent={<FontAwesomeIcon icon={faCalendarCheck} />}
                variant="light"
                className="h-8 gap-2"
              >
                Confirmação Encerrada
              </Chip>
            )}
          </div>
          {confirmacao ? (
            <Chip
              variant="light"
              className="h-8 md:h-10 px-2 md:px-4 gap-2 text-white bg-primary border-primary"
            >
              Já respondido
            </Chip>
          ) : dataAtual <= providedDate ? (
            <Chip
              variant="light"
              className="h-8 md:h-10 px-2 md:px-4 gap-2 text-white bg-warning border-warning"
            >
              Confirmação Pendente
            </Chip>
          ) : (
            <Chip
              variant="light"
              className="h-8 md:h-10 px-2 md:px-4 gap-2 text-white bg-warning border-warning"
            >
              Não é Possível Confirmar
            </Chip>
          )}
        </div>
      </div>
    </Button>
  );
};

export default Evento;
