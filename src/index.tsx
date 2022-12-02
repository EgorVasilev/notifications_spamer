import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DashboardPage} from './pages/dashboard/dashboard';
import {HomePage} from './pages/home/home';
import {DASHBOARD, HOME_PAGE, LOGIN} from './constants/routes';
import {LoginPage} from './pages/loginPage/loginPage';
import {ProtectedRoute} from './components/protectedRoute/protectedRoute';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {path: HOME_PAGE, element: <HomePage />},
      {
        path: DASHBOARD,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {path: LOGIN, element: <LoginPage />},
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <>
    <RouterProvider router={router} />
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
