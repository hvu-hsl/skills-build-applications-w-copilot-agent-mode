import { useEffect, useState } from 'react';
import DataState from './DataState';

const TEAMS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch(TEAMS_ENDPOINT)
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
      <h1 className="h3 mb-4">Teams</h1>
      <DataState loading={loading} error={error} isEmpty={items.length === 0}>
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-md-6" key={team._id ?? team.id ?? team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title h5">{team.name}</h2>
                  <ul className="list-unstyled mb-0">
                    {(team.members ?? []).map((member, index) => (
                      <li key={member?._id ?? member?.id ?? index}>
                        {member?.name ?? String(member)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </section>
  );
}
