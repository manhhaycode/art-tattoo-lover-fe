import config from '@/config';
import { UserBlogPage, UserBookTrackingPage, UserHistoryPage, UserProfilePage } from '@/features/users';
import UserLayout from '@/layouts/UserLayout';
//Public routes
const privateRoutes = [
    { path: config.routes.userProfile, component: UserProfilePage, layoutChild: UserLayout },
    { path: config.routes.userBooking, component: UserBookTrackingPage, layoutChild: UserLayout },
    { path: config.routes.userHistory, component: UserHistoryPage, layoutChild: UserLayout },
    { path: config.routes.userBlog, component: UserBlogPage, layoutChild: UserLayout },
];

export { privateRoutes };
