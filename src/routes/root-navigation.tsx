import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-list-item">
          <NavLink
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink
            className="nav-link"
            to="/tools"
          >
            Tools
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink
            className="nav-link"
            to="/openapi.yml"
            download={true}
          >
            OpenAPI Docs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

/*
<li className="nav-list-item">
  <NavLink
    className="nav-link"
    to="/activation"
  >
    Activation
  </NavLink>
</li>
<li className="nav-list-item">
  <NavLink
    className="nav-link"
    to="/dashboard"
  >
    Dashboard
  </NavLink>
</li>
<li className="nav-list-item">
  <NavLink
    className="nav-link"
    to="/mining"
  >
    Mining
  </NavLink>
</li>
<li className="nav-list-item">
  <NavLink
    className="nav-link"
    to="/stacking"
  >
    Stacking
  </NavLink>
</li>
*/
