import axios from "axios";
import { useEffect, useState } from "react";

type FetchState<T> = {
  fetchedData: T;
  isLoading: boolean;
  error: any;
};

export const useFetch = <T>(url: string, initialData: T, dependencies: any[] = []): FetchState<T>  =>{
  const [fetchedData, setFetchedData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData(): Promise<void>{
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        console.log(res.data.response);
        setFetchedData(res.data.response);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [url, ...dependencies]);

  return { fetchedData, isLoading, error };
}