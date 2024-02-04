import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { journalRoutes } from "./journalRoutes";
import { CheckingAuth } from "../ui";
import { AuthRouter } from "./AuthRouter";
import { JournalRouter } from "./JournalRouter";
import { useCheckAuth } from "../hooks";

const router = createBrowserRouter([
    {
      path: '/auth/*',
      element: <AuthRouter />,
      children: authRoutes,
    },
    {
      path: '/',
      element: <JournalRouter/>,
      children: journalRoutes,
    },
    {
      path: '/*',
      element: <Navigate to={'/'} />,
    },
]);
   
export const AppRouter = () => {
    const status = useCheckAuth();

    if (status === 'checking') {
      return <CheckingAuth />;
    }
   
    return <RouterProvider router={router} />;
};