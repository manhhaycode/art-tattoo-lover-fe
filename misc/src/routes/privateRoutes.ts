import config from '@/config';
import { UserBookTrackingPage, UserHistoryPage, UserProfilePage } from '@/features/users';
import UserLayout from '@/layouts/UserLayout';
//Public routes
const privateRoutes = [
    { path: config.routes.userProfile, component: UserProfilePage, layoutChild: UserLayout },
    { path: config.routes.userBooking, component: UserBookTrackingPage, layoutChild: UserLayout },
    { path: config.routes.userHistory, component: UserHistoryPage, layoutChild: UserLayout },
];

export { privateRoutes };
