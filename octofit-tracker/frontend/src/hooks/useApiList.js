import { useEffect, useState } from 'react';
import { fetchList } from '../api';

export function useApiList(resource) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchList(resource)
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [resource]);

  return { items, error, loading };
}
