'use client'

import React, { useState } from 'react';
import Evento from '../components/screens/evento';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import Image from 'next/image';

type EventoProp = {
  id: string
  titulo: string
  data: string
  hora: string
  local: string
  descricao: string
}

const eventos: EventoProp[] = [
  {
    id: '123456',
    titulo: 'Festa Natal Holambra',
    data: '19/12/2024',
    hora: '17:00',
    local: 'Luiza Bertassola Milânes, 682, Vila Rica, Santo Antônio de Posse',
    descricao: ''
  }
]


import Teste from '../assets/Farm-fields-sky-clouds_3840x2160.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faClock, faUsers, faBeer } from '@fortawesome/free-solid-svg-icons';


export default function Home() {

  const [isSelect, setSelect] = useState<EventoProp>()
  const [isOpen, setOpen] = useState(false)

  const onClose = () => setOpen(false)

  return (
    <>
      <div className='p-10'>
        {
          eventos.map((event) => {
            return (
              <Evento
                id={event.id}
                titulo={event.titulo}
                data={event.data + ' ás ' + event.hora}
                local={event.local}
                onAction={() => {
                  setSelect(event)
                  setOpen(true)
                }} />
            )
          })
        }
      </div>

      <Modal
        size={'5xl'}
        isOpen={isOpen}
        onClose={onClose}
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className=' overflow-hidden h-64 flex items-center rounded-2xl'>
                  <Image
                    src={Teste}
                    alt="Fundo Evento"
                  />
                </div>

                <div>

                  <div className='flex gap-4 flex-col items-start w-4/6'>
                    <span className='font-bold text-4xl text-black'>{isSelect?.titulo}</span>

                    <Divider className="my-1" />

                    <div className='flex items-center gap-3'>
                      <FontAwesomeIcon icon={faCalendarDays} size='lg' color={'#3E7E28'} />
                      <span className='font-medium text-xl text-black'>{isSelect?.data} ás {isSelect?.hora}</span>
                    </div>

                    <div className='flex items-center gap-3'>
                      <FontAwesomeIcon icon={faLocationDot} size='lg' color={'#3E7E28'} />
                      <span className='font-medium text-xl text-black'>{isSelect?.local}</span>
                    </div>

                    <Divider className="my-1" />

                    <div>
                      <span className='font-medium text-xl text-black'>
                        Espaço para colocar uma descrição do evento, podendo explicar o local, as regras entre outras coisas
                      </span>
                    </div>

                    <Divider className="my-1" />

                    <span className='font-bold text-2xl text-[#000]'>Informações Importantes</span>

                    <div className='flex items-center space-x-4 h-20'>
                      <div className='flex items-center gap-4'>
                        <FontAwesomeIcon icon={faClock} size='lg' color={'#3E7E28'} />
                        <span className='font-medium text-xl text-black'>Duração<br />2h 30m</span>
                      </div>

                      <Divider orientation="vertical" className="mx-1 h-3/4" />

                      <div className='flex items-center gap-4'>
                        <FontAwesomeIcon icon={faUsers} size='lg' color={'#3E7E28'} />
                        <span className='font-medium text-xl text-black'>Dependentes<br />até 18 anos</span>
                      </div>

                      <Divider orientation="vertical" className="mx-1 h-3/4" />

                      <div className='flex items-center gap-4'>
                        <FontAwesomeIcon icon={faBeer} size='xl' color={'#3E7E28'} />
                        <span className='font-medium text-xl text-black'>Bebidas para<br />maiores de 18 anos</span>
                      </div>

                    </div>
                  </div>

                  <div></div>

                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>


  );
}
