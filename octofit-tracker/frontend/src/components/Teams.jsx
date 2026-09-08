import { useApiList } from '../hooks/useApiList';
import DataState from './DataState';

export default function Teams() {
  const { items, error, loading } = useApiList('teams');

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
