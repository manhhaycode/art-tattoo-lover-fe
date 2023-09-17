import config from '@/config';
import { Discover, Home } from '@/features/misc';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Fragment } from 'react';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.discover, component: Discover, layout: DefaultLayout },
];

export { publicRoutes };
