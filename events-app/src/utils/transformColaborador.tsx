interface Dependente {
  tipo: number;
  nome_completo: string;
  colaborador_id: string;
  data_nascimento: string;
  id: string;
}

interface Colaborador {
  nome_completo: string;
  cracha: string;
  id: string;
}

interface Acompanhante {
  nome_completo: string;
  colaborador_id: string;
}

export interface Registro {
  bebida_alcoolica: number;
  participacao: number;
  transporte: number;
  colaborador: Colaborador | null;
  dependente: Dependente | null;
  acompanhante: Acompanhante | null;
}

export function transformJSON(json: any): Registro[] {
  const registros: Registro[] = [];
  if (json && json.dependente) {
    const { nome_completo, cracha, id, dependente } = json;
    const colaboradorRegistro: Registro = {
      bebida_alcoolica: 0,
      participacao: 1,
      transporte: 0,
      colaborador: {
        nome_completo: nome_completo,
        cracha: cracha,
        id: id,
      },
      dependente: null,
      acompanhante: null,
    };

    registros.push(colaboradorRegistro);

    dependente.forEach((dep: any) => {
      const dependenteRegistro: Registro = {
        bebida_alcoolica: 0,
        participacao: 1,
        transporte: 0,
        colaborador: null,
        dependente: {
          tipo: dep.tipo,
          nome_completo: dep.nome_completo,
          colaborador_id: dep.colaborador_id,
          data_nascimento: dep.data_nascimento,
          id: dep.id,
        },
        acompanhante: null,
      };

      registros.push(dependenteRegistro);
    });

    const hasConjuge = dependente.filter((e: any) => e.tipo === 1).length === 0;

    if (hasConjuge) {
      const acompanhanteRegistro: Registro = {
        bebida_alcoolica: 0,
        participacao: 0,
        transporte: 0,
        colaborador: null,
        dependente: null,
        acompanhante: {
          nome_completo: "",
          colaborador_id: id,
        },
      };

      registros.push(acompanhanteRegistro);
    }
  }

  return registros;
}
