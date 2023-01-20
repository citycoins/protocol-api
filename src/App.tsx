import reactLogo from './assets/react.svg';
import './App.css';

import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';
import { Logo } from './components/ustx-logo';

function Contents() {
  return (
    <>
      <div className={'logos'}>
        <a
          href="https://micro-stacks.dev"
          target="_blank"
          className={'micro-stacks-logo'}
        >
          <Logo
            size={84}
            className="logo"
          />
        </a>
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src="/vite.svg"
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
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
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}
