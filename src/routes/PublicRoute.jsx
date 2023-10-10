import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ element: Element, isAuth, children, ...rest }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuth, navigate])

  return isAuth ? <></> : <Outlet />
}

export default PublicRoute
