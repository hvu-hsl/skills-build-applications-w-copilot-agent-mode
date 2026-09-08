import { API_BASE_URL } from '../api';
import { useApiList } from '../hooks/useApiList';
import DataState from './DataState';

const USERS_ENDPOINT = `${API_BASE_URL}/api/users/`;

export default function Users() {
  const { items, error, loading } = useApiList(USERS_ENDPOINT);

  return (
    <section>
      <h1 className="h3 mb-4">Users</h1>
      <DataState loading={loading} error={error} isEmpty={items.length === 0}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </section>
  );
}
