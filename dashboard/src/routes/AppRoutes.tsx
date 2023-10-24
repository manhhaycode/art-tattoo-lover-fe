import ScrollToTop from '@/components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Error from '@/components/common/Error';
import SystemLayout from '@/layouts/SystemLayout';
import StudioLayout from '@/layouts/StudioLayout';
import { StudioDashBoard, StudioMangeUser, ManageStudio } from '@/features/studio';
import { Login } from '@/features/auth';

export default function AppRoutes() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<div>Day la trang dashboard</div>}></Route>
                    <Route path="/system" element={<SystemLayout />}>
                        <Route index element={<Navigate to={'/system/dashboard'} />}></Route>
                        <Route path="/system/dashboard" element={<div>System dashboard</div>}></Route>
                        <Route path="/system/manage-user" element={<div>System manage user</div>}></Route>
                        <Route path="/system/manage-studio" element={<div>System manage studio</div>}></Route>
                    </Route>
                    <Route path="/studio" element={<StudioLayout />}>
                        <Route index element={<Navigate to={'/studio/dashboard'} />}></Route>
                        <Route path="/studio/dashboard" element={<StudioDashBoard />}></Route>
                        <Route path="/studio/manage-user" element={<StudioMangeUser />}></Route>
                        <Route path="/studio/manage-studio" element={<ManageStudio />}></Route>
                    </Route>
                </Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </Router>
    );
}
