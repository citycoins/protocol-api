import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import NotFound from './routes/not-found';
import TestRoute from './routes/test-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/activation',
    element: <TestRoute />,
  },
  {
    path: '/dashboard',
    element: <TestRoute />,
  },
  {
    path: '/mining',
    element: <TestRoute />,
  },
  {
    path: '/stacking',
    element: <TestRoute />,
  },
  {
    path: '/tools',
    element: <TestRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
