import { faBars, faCalendarPlus, faChampagneGlasses, faClose, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Drawer } from "@mui/material"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import Logo from '../../assets/logo.png'

type Props = {
    open: boolean
    setOpen: any
}

export const Navigation = ({ open, setOpen }: Props) => {

    const router = useRouter()
    const pathname = usePathname()

    return (
        <>
            <div className="w-full p-6">
                <Button isIconOnly aria-label="Close Drawer" className={`bg-[#E4F4DF]`} onPress={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faBars} color={'#306B25'} />
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
                        invisible: true
                    }
                }}
                PaperProps={{
                    elevation: 0
                }}
            >
                <div className="w-80 flex-1 flex flex-col border-2 border-r-[${colors.border}] px-6 gap-10">
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
                            <Button isIconOnly aria-label="Close Drawer" className={`bg-[#E4F4DF]`} onPress={() => setOpen(false)}>
                                <FontAwesomeIcon icon={faClose} color={'#306B25'} />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button
                            variant="light"
                            aria-label="Champagne Party"
                            className={`${pathname === '/' ? `bg-[#E4F4DF]` : ''} h-14 gap-6 justify-start`}
                            onClick={() => {
                                router.push('/')
                            }}>
                            <FontAwesomeIcon icon={faChampagneGlasses} color={pathname === '/' ? '#306B25' : ''} className="h-4" />
                            <span className={`text-[#306B25]`}>Eventos</span>
                        </Button>

                        <Button
                            variant="light"
                            aria-label="Champagne Party"
                            className={`h-16 gap-6 justify-start  ${pathname === '/controleEventos' ? `bg-[#E4F4DF]` : ''}`}
                            onClick={() => {
                                router.push('/controleEventos')
                            }}>
                            <FontAwesomeIcon icon={faCalendarPlus} color={pathname === '/controleEventos' ? '#306B25' : ''} className="h-4" />
                            Controle de Eventos
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className={`font-medium text-lg text-gray-500`}>Outros</span>
                        <Button
                            variant="light"
                            aria-label="help"
                            className={`${pathname === '/help' ? `bg-[#E4F4DF]` : ''} h-14 gap-6 justify-start`}
                            onClick={() => {
                                router.push('/help')
                            }} >
                            <FontAwesomeIcon icon={faInfoCircle} color={pathname === '/help' ? '#306B25' : ''} className="h-4" />
                            <span className={`text-[#306B25]`}>Ajuda</span>
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
