'use client'

import React, { useState } from 'react';
import Evento from '../components/screens/evento';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from 'next/image';

type EventoProp = {
  id: string
  titulo: string
  data: string
  local: string
  descricao: string
}

const eventos: EventoProp[] = [
  {
    id: '123456',
    titulo: 'Festa Natal Holambra',
    data: '19/12/2024',
    local: 'Luiza Bertassola Milânes, 682, Vila Rica, Santo Antônio de Posse',
    descricao: ''
  }
]


import Teste from '../assets/Farm-fields-sky-clouds_3840x2160.jpg'


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
                data={event.data}
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
                <div className=' overflow-hidden h-64 flex items-center rounded-2xl relative'>
                  <Image
                    src={Teste}
                    alt="Fundo Evento"
                  />
                  <span className='flex items-center justify-center absolute bg-[#00000066] font-bold text-5xl text-white h-full w-full'>{isSelect?.titulo}</span>
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
