export interface Dependente {
  colaborador_id: string;
  data_nascimento: string;
  id: string;
  nome_completo: string;
  tipo: number;
}

export interface Colaborador {
  id: string;
  cracha: string;
  nome_completo: string;
  autorizacao: number;
  status: number;
  filial_id: string;
  dependente: Dependente[];
}

export interface TransformedDependente {
  id: string;
  nome: string;
  idade: number;
  tipo: number;
  presenca: boolean;
  bebida: boolean;
}

export interface TransformedColaborador {
  id: string;
  nome: string;
  presenca: boolean;
  bebida: boolean;
  transporte: boolean;
  dependentes: TransformedDependente[];
}

export function transformJSON(json: Colaborador): TransformedColaborador {
  const transformDependente = (dep: Dependente): TransformedDependente => {
    const hoje = new Date();
    const dataNascimento = new Date(dep.data_nascimento);
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    return {
      id: dep.id,
      nome: dep.nome_completo,
      idade,
      tipo: dep.tipo,
      presenca: false,
      bebida: false,
    };
  };

  const transformado: TransformedColaborador = {
    id: json.cracha,
    nome: json.nome_completo,
    presenca: true,
    bebida: false,
    transporte: false,
    dependentes: json.dependente.map(transformDependente),
  };

  return transformado;
}
