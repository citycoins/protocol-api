import { Link, useLocation } from 'react-router-dom';
import Navigation from './root-navigation';

export default function TestRoute() {
  const location = useLocation();

  return (
    <div>
      <img
        src="/citycoins-api-logo.png"
        alt="CityCoins API Logo"
      />
      <h1>Testing Routes</h1>
      <p>Current location: {location.pathname}</p>
      <Navigation />
      <p>
        Powered by{' '}
        <Link
          to="https://micro-stacks.dev"
          target="_blank"
          rel="noreferrer nofollower"
        >
          micro-stacks
        </Link>{' '}
        and{' '}
        <Link
          to="https://pages.cloudflare.com/"
          target="_blank"
          rel="noreferrer nofollower"
        >
          Cloudflare Pages
        </Link>
      </p>
    </div>
  );
}
