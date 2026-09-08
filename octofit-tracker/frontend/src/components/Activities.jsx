import { useEffect, useState } from 'react';
import DataState from './DataState';

const ACTIVITIES_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch(ACTIVITIES_ENDPOINT)
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
      <h1 className="h3 mb-4">Activities</h1>
      <DataState loading={loading} error={error} isEmpty={items.length === 0}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? activity.id}>
                  <td>{activity.user?.name ?? activity.user ?? '—'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </section>
  );
}
