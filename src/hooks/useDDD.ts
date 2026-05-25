import { useState, useEffect, useCallback } from 'react';
import { DDDResponse, RequestState } from '../types/ddd.types';
import { fetchDDDInfo } from '../services/brasilApi';

interface UseDDDReturn extends RequestState {
  ddd: string;
  setDDD: (value: string) => void;
  search: () => void;
}

/**
 * Hook personalizado que gerencia o estado e os efeitos da consulta de DDD.
 * - useState: controla o input, dados da API e status de loading/erro
 * - useEffect: reage ao gatilho de busca e executa a chamada assíncrona
 */
export function useDDD(): UseDDDReturn {
  const [ddd, setDDD] = useState<string>('');
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data, setData] = useState<DDDResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(() => {
    if (ddd.trim().length !== 2 || !/^\d{2}$/.test(ddd.trim())) {
      setError('Informe exatamente 2 dígitos numéricos (ex: 11, 21, 47).');
      return;
    }
    setError(null);
    setShouldFetch(true);
  }, [ddd]);

  useEffect(() => {
    if (!shouldFetch) return;

    let cancelled = false;

    const runFetch = async (): Promise<void> => {
      setLoading(true);
      setData(null);

      try {
        const result = await fetchDDDInfo(ddd.trim());
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Erro desconhecido.';
          setError(message);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setShouldFetch(false);
        }
      }
    };

    runFetch();

    return () => {
      cancelled = true;
    };
  }, [shouldFetch, ddd]);

  return { ddd, setDDD, search, data, loading, error };
}