import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/activation">Activation</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/mining">Mining</Link>
        </li>
        <li>
          <Link to="/stacking">Stacking</Link>
        </li>
        <li>
          <Link to="/tools">Tools</Link>
        </li>
      </ul>
    </nav>
  );
}
