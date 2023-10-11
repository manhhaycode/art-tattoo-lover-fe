import config from '@/config';
import { SearchLocation } from '@/features/map/routes';
import { Discover, BecomeStudio, TopArtist, NewsFeed, SearchStudio, Home } from '@/features/misc';
import DefaultLayout from '@/layouts/DefaultLayout';
//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.discovery, component: Discover, layout: DefaultLayout },
    { path: config.routes.becomeStudio, component: BecomeStudio, DefaultLayout },
    { path: config.routes.topArtist, component: TopArtist, layout: DefaultLayout },
    { path: config.routes.newsFeed, component: NewsFeed, layout: DefaultLayout },
    { path: config.routes.searchStudio, component: SearchStudio, layout: DefaultLayout },
    { path: config.routes.searchLocation, component: SearchLocation, layout: DefaultLayout },
];

export { publicRoutes };
