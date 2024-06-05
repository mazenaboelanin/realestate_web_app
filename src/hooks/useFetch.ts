import axios from "axios";
import { useEffect, useState } from "react";

type FetchState<T> = {
  fetchedData: T;
  metaData: {totalPages: number};
  isLoading: boolean;
  error: any;
};

export const useFetch = <T>(url: string, initialData: T, dependencies: any[] = []): FetchState<T>  =>{
  const [fetchedData, setFetchedData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [metaData, setMetaData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void>{
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        console.log(res.data.response);
        setFetchedData(res.data.response?.data);
        setMetaData(res.data.response?.meta);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [url, ...dependencies]);

  return { fetchedData, metaData, isLoading, error };
}