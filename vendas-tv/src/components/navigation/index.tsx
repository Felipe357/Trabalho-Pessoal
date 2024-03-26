import {
  faBars,
  faCalendarPlus,
  faBagShopping,
  faClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@mui/material";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "../../assets/logo_tv 1.png";

type Props = {
  open: boolean;
  setOpen: any;
};

export const Navigation = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="w-full p-6">
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
        <div className="w-80 flex-1 flex flex-col px-6 gap-10">
          <div className="flex flex-row justify-between items-center mt-8">
            <div className="flex flex-row items-center justify-center">
              <Image
                src={Logo}
                height={35}
                className="mt-[-5px]"
                alt="Picture of the author"
              />
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
              variant={pathname === "/" ? "solid" : "light"}
              aria-label="Champagne Party"
              className={`h-14 gap-6 justify-start`}
              color="primary"
              onClick={() => {
                router.push("/");
              }}
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                color={pathname === "/" ? "#FFF" : "#000"}
                className="h-4"
              />
              <span className={`${pathname !== "/" && "text-black"}`}>
                Vendas
              </span>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <span className={`font-medium text-lg text-gray-500`}>Outros</span>
            <Button
              variant={pathname === "/help" ? "solid" : "light"}
              aria-label="help"
              className={`h-14 gap-6 justify-start`}
              color="primary"
              onClick={() => {
                router.push("/help");
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                color={pathname === "/help" ? "#FFF" : "#000"}
                className="h-4"
              />
              <span className={`${pathname !== "/help" && "text-black"}`}>
                Ajuda
              </span>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
