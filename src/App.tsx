import './App.css';
import ccLogo from './assets/citycoins.png';
import * as MicroStacks from '@micro-stacks/react';
import RootIndex from './routes/root-index';

export default function App() {
  return (
    <MicroStacks.ClientProvider
      appName={'CityCoins Protocol API'}
      appIconUrl={ccLogo}
    >
      <RootIndex />
    </MicroStacks.ClientProvider>
  );
}
