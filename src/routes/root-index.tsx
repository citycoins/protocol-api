import { UserCard } from '../components/user-card';
import { WalletConnectButton } from '../components/wallet-connect-button';
import ccLogo from '../assets/citycoins.png';
import Navigation from './root-navigation';

export default function RootIndex() {
  return (
    <div>
      <img
        src={ccLogo}
        alt="logo test"
      />
      <h1>micro-stacks + Vite + React</h1>
      <div className="card">
        <UserCard />
        <WalletConnectButton />
        <p
          style={{
            display: 'block',
            marginTop: '40px',
          }}
        >
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the micro-stacks, Vite, and React logos to learn more
      </p>
      <a
        href="openapi.yml"
        download
      >
        OpenAPI Docs?
      </a>
      <Navigation />
    </div>
  );
}
