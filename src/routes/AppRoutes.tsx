import ScrollToTop from '@/components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
import WithAuthencation from '@/hocs/withAuthencation';
import { Home } from '@/features/misc';
import DefaultLayout from '@/layouts/DefaultLayout';
import Error from '@/components/common/Error';

export default function AppRoutes() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />}></Route>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        return <Route key={index} path={route.path} element={<Page />}></Route>;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        const LayoutChild = route.layoutChild;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <WithAuthencation>
                                        {LayoutChild ? (
                                            <LayoutChild>
                                                <Page />
                                            </LayoutChild>
                                        ) : (
                                            <Page />
                                        )}
                                    </WithAuthencation>
                                }
                            ></Route>
                        );
                    })}
                </Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </Router>
    );
}
