/**
 * Representa o payload retornado pela Brasil API no endpoint /api/ddd/v1/{ddd}
 * Documentação: https://brasilapi.com.br/docs#tag/DDD
 */
export interface DDDResponse {
  state: string;
  cities: string[];
}

/**
 * Estado da requisição para controle de UI
 */
export interface RequestState {
  data: DDDResponse | null;
  loading: boolean;
  error: string | null;
}