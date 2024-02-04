import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const JournalRouter = () => {
    const {status} = useSelector(state => state.auth)
    if(status !== 'authenticated') {
        return <Navigate to="/auth/login"/>
    }
  return (
    <Outlet/>
  )
}
