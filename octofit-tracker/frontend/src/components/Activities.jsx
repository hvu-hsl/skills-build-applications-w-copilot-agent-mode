import { useApiList } from '../hooks/useApiList';
import DataState from './DataState';

export default function Activities() {
  const { items, error, loading } = useApiList('activities');

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
