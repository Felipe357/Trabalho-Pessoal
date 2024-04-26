import { differenceInMinutes, parse } from "date-fns";

const calcularIntervaloFormatado = (inicio: string, fim: string): string => {
  const inicioDate = parse(inicio, "HH:mm", new Date());
  const fimDate = parse(fim, "HH:mm", new Date());
  const diferencaEmMinutos = differenceInMinutes(fimDate, inicioDate);
  const horas = Math.floor(diferencaEmMinutos / 60);
  const minutos = diferencaEmMinutos % 60;
  return `${horas.toString().padStart(2, "0")}h ${minutos
    .toString()
    .padStart(2, "0")}m`;
};

export default calcularIntervaloFormatado;
