import Image from "next/image";
import { Button, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { usePageContext } from "../pageProvider";
import { parse } from "date-fns";
import { type EventoProp } from "@/provider/provider";

type EventoProps = {
  eventProps: EventoProp;
};

const Evento = ({ eventProps }: EventoProps) => {
  const {
    id,
    foto,
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
      className="relative w-full h-auto max-w-[620px] min-h-[280px] md:min-h-[320px] overflow-hidden rounded-3xl"
      onPress={() => {
        onOpen();
        setValue("evento", eventProps);
      }}
    >
      <div className="w-full">
        <Image
          src={foto.foto as string}
          layout="fill"
          objectFit="cover"
          alt="Fundo Evento"
        />
      </div>
      <div className="bg-[#00000066] absolute h-full w-full top-0 p-4 md:p-6 flex flex-col justify-between items-start">
        <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mix-blend-screen whitespace-normal">
          {titulo}
        </span>
        <div className="w-full flex flex-wrap gap-y-2 justify-between items-end">
          <div className="flex flex-col justify-start items-start gap-2">
            <Chip
              startContent={<FontAwesomeIcon icon={faCalendarDays} />}
              variant="faded"
              className="h-8 md:h-10 px-2 md:px-4 gap-2"
            >
              {data}
            </Chip>
            <Chip
              startContent={<FontAwesomeIcon icon={faLocationDot} />}
              variant="faded"
              className="h-8 md:h-10 px-2 md:px-4 gap-2"
            >
              {truncatedLocal}
            </Chip>
            {dataAtual <= providedDate ? (
              <Chip
                startContent={<FontAwesomeIcon icon={faCalendarCheck} />}
                variant="faded"
                className="h-8 md:h-10 px-2 md:px-4 gap-2"
              >
                Confirmar até {formulario.end}
              </Chip>
            ) : (
              <Chip
                startContent={<FontAwesomeIcon icon={faCalendarCheck} />}
                variant="faded"
                className="h-8 md:h-10 px-2 md:px-4 gap-2"
              >
                Confirmação Encerrada
              </Chip>
            )}
          </div>
          {confirmacao ? (
            <Chip
              variant="faded"
              className="h-8 md:h-10 px-2 md:px-4 gap-2 text-white bg-primary border-primary"
            >
              Já confirmado
            </Chip>
          ) : dataAtual <= providedDate ? (
            <Chip
              variant="faded"
              className="h-8 md:h-10 px-2 md:px-4 gap-2 text-white bg-warning border-warning"
            >
              Confirmação Pendente
            </Chip>
          ) : (
            <Chip
              variant="faded"
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
