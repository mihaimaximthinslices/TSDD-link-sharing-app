import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ element: Element, isAuth, ...rest }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login', { replace: true })
    }
  }, [isAuth, navigate])

  return isAuth ? <Outlet /> : <></>
}

export default PrivateRoute
