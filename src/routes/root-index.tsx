import { Link, useLocation } from 'react-router-dom';
import { UserCard } from '../components/user-card';
import { WalletConnectButton } from '../components/wallet-connect-button';
import Navigation from './root-navigation';

export default function RootIndex() {
  const location = useLocation();

  return (
    <div>
      <img
        src="/citycoins-api-logo.png"
        alt="CityCoins API Logo"
      />
      <h1>CityCoins Protocol API</h1>
      <p>Current location: {location.pathname}</p>
      <Navigation />
      <div className="card">
        <UserCard />
        <WalletConnectButton />
      </div>
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
