import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';

import AddExpense from '../pages/AddExpense';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import EditExpense from '../pages/EditExpense';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-expense',
        element: (
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        ),
      },
      {
        path: `/edit-expense/:id`,
        element: (
          <PrivateRoute>
            <EditExpense />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
