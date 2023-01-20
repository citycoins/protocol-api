import './App.css';
import ccLogo from './assets/citycoins.png';
import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';

function Contents() {
  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <MicroStacks.ClientProvider
      appName={'CityCoins Protocol API'}
      appIconUrl={ccLogo}
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}
