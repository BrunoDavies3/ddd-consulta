import { DDDResponse } from '../types/ddd.types';

const BASE_URL = 'https://brasilapi.com.br/api/ddd/v1';

/**
 * Busca as informações de estado e cidades de um código DDD.
 * @param ddd - Código DDD com 2 dígitos (ex: "11", "13")
 * @returns Promise com os dados { state, cities }
 * @throws Error com mensagem amigável em caso de falha
 */
export async function fetchDDDInfo(ddd: string): Promise<DDDResponse> {
  const response = await fetch(`${BASE_URL}/${ddd}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`DDD ${ddd} não encontrado. Verifique o código informado.`);
    }
    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
  }

  const data: DDDResponse = await response.json();
  return data;
}