import { useEffect, useState } from 'react';
import DataState from './DataState';

const WORKOUTS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch(WORKOUTS_ENDPOINT)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (active) setItems(Array.isArray(data) ? data : (data?.results ?? []));
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
  }, []);

  return (
    <section>
      <h1 className="h3 mb-4">Workout suggestions</h1>
      <DataState loading={loading} error={error} isEmpty={items.length === 0}>
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-md-4" key={workout._id ?? workout.id ?? workout.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title h5">{workout.name}</h2>
                  <span className="badge text-bg-secondary mb-2">{workout.difficulty}</span>
                  <p className="card-text">{workout.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </section>
  );
}
