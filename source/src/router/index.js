import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HomeView, WifiView } from '@/views';

const routes = createHashRouter([
    {
        path: '/',
        element: <HomeView />
    },
    {
        path: '/wifi',
        element: <WifiView />
    },
    {
        path: '/library',
        element: <WifiView />
    }
]);

export const Router = () => {
    return <RouterProvider router={routes} />;
};

export default Router;
