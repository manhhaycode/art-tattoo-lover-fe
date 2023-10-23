import config from '@/config';
import { SearchLocation } from '@/features/map/routes';
import { SearchStudio, Studio } from '@/features/studios';
import { Discover, BecomeStudio, TopArtist, NewsFeed } from '@/features/misc';
//Public routes
const publicRoutes = [
    { path: config.routes.discovery, component: Discover },
    { path: config.routes.becomeStudio, component: BecomeStudio },
    { path: config.routes.topArtist, component: TopArtist },
    { path: config.routes.newsFeed, component: NewsFeed },
    { path: config.routes.searchStudio, component: SearchStudio },
    { path: config.routes.searchLocation, component: SearchLocation },
    { path: config.routes.studio, component: Studio },
];

export { publicRoutes };
