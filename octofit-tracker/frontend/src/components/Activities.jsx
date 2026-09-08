import { API_BASE_URL } from '../api';
import { useApiList } from '../hooks/useApiList';
import DataState from './DataState';

const ACTIVITIES_ENDPOINT = `${API_BASE_URL}/api/activities/`;

export default function Activities() {
  const { items, error, loading } = useApiList(ACTIVITIES_ENDPOINT);

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
