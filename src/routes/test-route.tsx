import { useLocation } from 'react-router-dom';
import Navigation from './root-navigation';

export default function TestRoute() {
  const location = useLocation();

  return (
    <div>
      <h1>Testing Routes</h1>
      <p>Current location: {location.pathname}</p>
      <Navigation />
    </div>
  );
}
