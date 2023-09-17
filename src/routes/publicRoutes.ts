import config from '@/config';
import { Discover, Home } from '@/features/misc';
import DefaultLayout from '@/layouts/DefaultLayout';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.discover, component: Discover, layout: DefaultLayout },
];

export { publicRoutes };
