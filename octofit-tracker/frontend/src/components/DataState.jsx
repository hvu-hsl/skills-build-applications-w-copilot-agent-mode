export default function DataState({ loading, error, isEmpty, children }) {
  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Loading…
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (isEmpty) {
    return <div className="alert alert-info">No records yet. Run the backend seed script.</div>;
  }

  return children;
}
