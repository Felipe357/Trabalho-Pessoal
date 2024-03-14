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
          className={`bg-[#BFD1FF]`}
          onPress={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} color={"#000"} />
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
            <div className="flex flex-row items-center justify-center gap-4">
              <Image
                src={Logo}
                height={35}
                className="mt-[-5px]"
                alt="Picture of the author"
              />
              {/* <span className="font-bold text-2xl">Teste</span> */}
            </div>
            <div>
              <Button
                isIconOnly
                aria-label="Close Drawer"
                className={`bg-[#BFD1FF]`}
                onPress={() => setOpen(false)}
              >
                <FontAwesomeIcon icon={faClose} color={"#000"} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              variant="light"
              aria-label="Champagne Party"
              className={`${
                pathname === "/" ? `bg-[#BFD1FF]` : ""
              } h-14 gap-6 justify-start`}
              onClick={() => {
                router.push("/");
              }}
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                color={pathname === "/" ? "#000" : ""}
                className="h-4"
              />
              <span className={`text-[#000]`}>Vendas</span>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <span className={`font-medium text-lg text-gray-500`}>Outros</span>
            <Button
              variant="light"
              aria-label="help"
              className={`${
                pathname === "/help" ? `bg-[#BFD1FF]` : ""
              } h-14 gap-6 justify-start`}
              onClick={() => {
                router.push("/help");
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                color={pathname === "/help" ? "#000" : ""}
                className="h-4"
              />
              <span className={`text-[#000]`}>Ajuda</span>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
