import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import logo from './assets/octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './api';
import './App.css';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="" width="32" height="32" />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} className="nav-link" to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p className="text-secondary">Page not found.</p>} />
        </Routes>
      </main>

      <footer className="container py-3 text-secondary small">API: {API_BASE_URL}</footer>
    </>
  );
}

export default App;
