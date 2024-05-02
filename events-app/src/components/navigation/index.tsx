import {
  faBars,
  faCalendarPlus,
  faChampagneGlasses,
  faClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@mui/material";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "../../assets/logo.png";
import { useInicialContext } from "@/provider/provider";
import { useEffect } from "react";

type Props = {
  open: boolean;
  setOpen: any;
};

export const Navigation = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { form } = useInicialContext();

  const { watch } = form;

  const { colaborador } = watch();

  useEffect(() => {
    if (
      !colaborador ||
      (colaborador.autorizacao === 0 && pathname.includes("controleEventos"))
    ) {
      router.push("/");
    }
  }, [colaborador]);

  return (
    <>
      <div className="events w-full bg-white px-6 py-3 fixed top-0 left-0 right-0 z-20 flex flex-row items-center gap-10">
        <Button
          isIconOnly
          aria-label="Close Drawer"
          color="primary"
          onPress={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} color={"#FFF"} />
        </Button>
      </div>
      <Drawer
        anchor="left"
        open={open}
        variant="persistent"
        ModalProps={{
          keepMounted: true,
          disablePortal: true,
          BackdropProps: {
            invisible: true,
          },
        }}
        PaperProps={{
          elevation: 0,
        }}
      >
        <div className="events w-80 flex-1 flex flex-col border-2 border-r-[#eeeeee] px-6 gap-10">
          <div className="flex flex-row justify-between items-center mt-8">
            <div className="flex flex-row items-center justify-center gap-4">
              <Image
                src={Logo}
                width={45}
                height={45}
                className="mt-[-5px]"
                alt="Picture of the author"
              />
              <span className="font-bold text-2xl">CETV</span>
            </div>
            <div>
              <Button
                isIconOnly
                aria-label="Close Drawer"
                color="primary"
                onPress={() => setOpen(false)}
              >
                <FontAwesomeIcon icon={faClose} color={"#FFF"} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              color={
                pathname === "/" || pathname.includes("formulario")
                  ? "primary"
                  : "default"
              }
              variant="light"
              aria-label="Champagne Party"
              className="h-14 gap-6 justify-start"
              onClick={() => {
                router.push("/");
              }}
            >
              <FontAwesomeIcon icon={faChampagneGlasses} className="h-4" />
              Eventos
            </Button>

            {colaborador && colaborador.autorizacao === 1 && (
              <Button
                color={
                  pathname.includes("controleEventos") ? "primary" : "default"
                }
                variant="light"
                aria-label="Champagne Party"
                className="h-16 gap-6 justify-start"
                onClick={() => {
                  router.push("/controleEventos");
                }}
              >
                <FontAwesomeIcon icon={faCalendarPlus} className="h-4" />
                Controle de Eventos
              </Button>
            )}
          </div>
          {/* <div className="flex flex-col gap-4">
            <span className={`font-medium text-lg text-gray-500`}>Outros</span>
            <Button
              variant="light"
              aria-label="help"
              className={`${
                pathname === "/help" ? `bg-primary` : ""
              } h-14 gap-6 justify-start`}
              onClick={() => {
                router.push("/help");
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                color={pathname === "/help" ? "#FFF" : ""}
                className="h-4"
              />
              <span
                style={{
                  color: pathname === "/help" ? "#FFF" : "#000",
                }}
              >
                Ajuda
              </span>
            </Button>
          </div> */}
        </div>
      </Drawer>
    </>
  );
};
