import { useNovoEventoContext } from "../../novoEventoProvider";
import ControllerInput from "@/components/form/controllerInput";

import React, { useEffect } from "react";
import NovoEventoFooter from "../novoEventoFooter";
import ControllerTextArea from "@/components/form/controllerTextArea";
import { api } from "@/service/api";

const FormularioLocal = () => {
  const { form } = useNovoEventoContext();

  const { control, setValue, watch } = form;

  const { novoEvento } = watch();

  const handleCepChange = async () => {
    // Remove caracteres não numéricos do CEP
    const cepNumerico = novoEvento.cep.replace(/\D/g, "");

    // Verifique se o CEP tem o tamanho correto
    if (cepNumerico.length !== 8) {
      return;
    }

    // Faça a requisição para a API ViaCEP
    try {
      const { data } = await api.get(
        `https://cep.awesomeapi.com.br/json/${cepNumerico}`
      );

      if (!data.erro) {
        // Preencha os campos de endereço, bairro e cidade com os dados retornados
        setValue("novoEvento.endereco", data.address);
        setValue("novoEvento.bairro", data.district);
        setValue("novoEvento.cidade", data.city);
      } else {
        setValue("novoEvento.endereco", "");
        setValue("novoEvento.bairro", "");
        setValue("novoEvento.cidade", "");
      }
    } catch (error) {}
  };

  const handleGeocode = async () => {
    try {
      const address =
        novoEvento.endereco + " " + novoEvento.cidade + " " + novoEvento.numero;
      const response = await api.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address,
            format: "json",
          },
        }
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];

        setValue("novoEvento.latitude", lat);
        setValue("novoEvento.longitude", lon);
      } else {
        setValue("novoEvento.latitude", "");
        setValue("novoEvento.longitude", "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (
      novoEvento.endereco &&
      novoEvento.bairro &&
      novoEvento.cidade &&
      novoEvento.numero
    ) {
      handleGeocode();
    }
  }, [
    novoEvento.endereco,
    novoEvento.bairro,
    novoEvento.cidade,
    novoEvento.numero,
  ]);

  useEffect(() => {
    if (novoEvento.cep) {
      void handleCepChange();
    }
  }, [novoEvento.cep]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-wrap gap-6 overflow-y-auto pr-2 md:pr-0">
        <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui o cep",
              isRequired: true,
              label: "Cep",
              labelPlacement: "outside",
              className: "w-60 min-w-full md:min-w-40",
              maxLength: 9,
            }}
            controllerProps={{ control: control, name: "novoEvento.cep" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui o endereço",
              label: "Endereço",
              isRequired: true,
              labelPlacement: "outside",
              className: "w-5/6 min-w-full md:min-w-80",
            }}
            controllerProps={{ control: control, name: "novoEvento.endereco" }}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui o número",
              label: "Número",
              isRequired: true,
              labelPlacement: "outside",
              className: "w-full md:w-60",
            }}
            controllerProps={{ control: control, name: "novoEvento.numero" }}
          />

          <ControllerInput
            inputProps={{
              placeholder: "Digite aqui o bairro",
              label: "Bairro",
              isRequired: true,
              labelPlacement: "outside",
              className: "w-full md:w-10/12",
            }}
            controllerProps={{ control: control, name: "novoEvento.bairro" }}
          />
        </div>

        <ControllerInput
          inputProps={{
            placeholder: "Digite aqui a cidade",
            label: "Cidade",
            isRequired: true,
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.cidade" }}
        />

        <ControllerTextArea
          textAreaProps={{
            placeholder: "Digite aqui o complemento",
            label: "Complemento",
            labelPlacement: "outside",
            className: "w-full",
          }}
          controllerProps={{ control: control, name: "novoEvento.complemento" }}
        />
      </div>

      <NovoEventoFooter />
    </div>
  );
};

export default FormularioLocal;
