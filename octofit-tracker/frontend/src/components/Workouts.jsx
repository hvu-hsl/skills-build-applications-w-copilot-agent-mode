import { useApiList } from '../hooks/useApiList';
import DataState from './DataState';

export default function Workouts() {
  const { items, error, loading } = useApiList('workouts');

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
