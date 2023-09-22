import ScrollToTop from '@/components/ScrollToTop';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';

export default function AppRoutes() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Fragment>
                                    {route.layout !== null ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Page />
                                    )}
                                </Fragment>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}
