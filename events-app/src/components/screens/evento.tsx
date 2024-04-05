import Image from "next/image"

import Teste from '../../assets/Farm-fields-sky-clouds_3840x2160.jpg'
import { Button, Chip } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

type EventoProps = {
    id: string
    titulo: string
    data: string
    local: string
    onAction: () => void
}

const Evento = ({ id, titulo, data, local, onAction }: EventoProps) => {

    const maxLength = 50
    const [truncatedLocal, setTruncatedLocal] = useState(local);


    if (local.length > maxLength) {
        const truncated = local.slice(0, maxLength - 3) + '...';

        if (truncated !== truncatedLocal) setTruncatedLocal(truncated)
    }

    return (
        <Button isIconOnly className="relative w-[700px] h-[360px] overflow-hidden rounded-3xl" onPress={onAction}>
            <Image
                src={Teste}
                width={700}
                height={360}
                alt="Fundo Evento"
            />
            <div className="bg-[#00000066] absolute h-full w-full top-0 p-6 flex flex-col justify-between items-start">
                <span className="text-3xl font-semibold text-white">{titulo}</span>
                <div className="w-full flex flex-row justify-start items-end">
                    <div className="flex flex-col gap-2">
                        <Chip
                            startContent={<FontAwesomeIcon icon={faCalendarDays} />}
                            variant="faded"
                            className="h-10 px-4 gap-2"
                        >
                            {data}
                        </Chip>
                        <Chip
                            startContent={<FontAwesomeIcon icon={faLocationDot} />}
                            variant="faded"
                            className="h-10 px-4 gap-2"
                        >
                            {truncatedLocal}
                        </Chip>
                    </div>
                </div>
            </div>
        </Button>

    )
}

export default Evento