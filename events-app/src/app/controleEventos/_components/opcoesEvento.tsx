import {
  faEdit,
  faEye,
  faPlus,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OpcaoesEvento = () => {
  const [maxLength, setMaxLength] = useState(true);

  useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth < 768);
    };

    updateMaxLength();

    window.addEventListener("resize", updateMaxLength);

    return () => {
      window.removeEventListener("resize", updateMaxLength);
    };
  }, []);

  const router = useRouter();

  const pathname = usePathname();

  return (
    <div className="shadow-large w-full md:min-w-72 md:max-w-60 h-36 md:h-full border-2 rounded-2xl border-[#eee] p-6 text-center flex flex-row md:flex-col overflow-auto gap-3">
      <span className="text-xl font-bold flex items-center justify-center">
        Configurações
      </span>

      <Divider orientation={maxLength ? "vertical" : "horizontal"} />

      <div className="w-full">
        <Listbox
          variant="flat"
          aria-label="Listbox menu with descriptions"
          classNames={{
            list: "flex flex-row md:flex-col gap-6",
          }}
        >
          <ListboxItem
            key="new"
            className="h-14 gap-4"
            description
            onPress={() => router.push(`/controleEventos/novoEvento`)}
            startContent={<FontAwesomeIcon icon={faPlus} />}
          >
            Novo evento
          </ListboxItem>
          <ListboxItem
            key="sync"
            className="h-14 gap-4"
            description
            startContent={<FontAwesomeIcon icon={faSync} />}
          >
            Sincronizar
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
};

export default OpcaoesEvento;
