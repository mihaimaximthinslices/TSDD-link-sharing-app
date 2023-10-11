import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { AuthContext } from '../store/AuthContext'
import axios from 'axios'
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext)

  const { isAuthenticated } = user

  useEffect(() => {
    axios
      .get('/status')
      .then((response) => {
        if (response.status === 200) {
          setUser((old) => {
            return {
              ...old,
              isAuthenticated: true,
            }
          })
        }
      })
      .catch((err) => {})
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate replace to="/dashboard" />,
      errorElement: <h1>Page not found</h1>,
    },
    {
      path: '/register',
      element: <PublicRoute isAuth={isAuthenticated} />,
      children: [
        {
          path: '',
          element: <Register />,
          errorElement: <h1>Register error</h1>,
        },
      ],
    },
    {
      path: '/login',
      element: <PublicRoute isAuth={isAuthenticated} />,
      children: [
        {
          path: '',
          element: <Login />,
          errorElement: <h1>Login error</h1>,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <PrivateRoute isAuth={isAuthenticated} />,
      children: [
        {
          path: '',
          element: <Dashboard/>,
          errorElement: <h1>Dashboard error</h1>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
