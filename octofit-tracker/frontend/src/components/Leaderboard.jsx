import { useApiList } from '../hooks/useApiList';
import DataState from './DataState';

export default function Leaderboard() {
  const { items, error, loading } = useApiList('leaderboard');

  return (
    <section>
      <h1 className="h3 mb-4">Leaderboard</h1>
      <DataState loading={loading} error={error} isEmpty={items.length === 0}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry, index) => (
                <tr key={entry._id ?? entry.id ?? entry.team}>
                  <td>{index + 1}</td>
                  <td>{entry.team}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </section>
  );
}
