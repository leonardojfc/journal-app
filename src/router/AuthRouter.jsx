import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const AuthRouter = () => {
    const {status} = useSelector(state => state.auth)

    if(status === 'authenticated') {
        return <Navigate to="/"/>
    }
  return (
    <Outlet/>
  )
}
