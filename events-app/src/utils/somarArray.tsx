export function somarArray(valores: number[]): number {
  let soma = 0;
  for (const valor of valores) {
    soma += valor;
  }
  return soma;
}
