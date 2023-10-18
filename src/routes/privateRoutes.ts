import config from '@/config';
import { UserProfile } from '@/features/users';
import UserLayout from '@/layouts/UserLayout';
//Public routes
const privateRoutes = [
    { path: config.routes.userProfile, component: UserProfile, layoutChild: UserLayout },
    { path: config.routes.userBooking, component: UserProfile, layoutChild: UserLayout },
    { path: config.routes.userHistory, component: UserProfile, layoutChild: UserLayout },
];

export { privateRoutes };
