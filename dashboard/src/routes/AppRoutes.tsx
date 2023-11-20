import ScrollToTop from '@/components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Error from '@/components/common/Error';
import SystemLayout from '@/layouts/SystemLayout';
import StudioLayout from '@/layouts/StudioLayout';
import {
    StudioDashBoard,
    StudioMangeUser,
    ManageStudio,
    ManageScheduleArtistPage,
    ManageStudioAppointmentPage,
    PreviewStudioPage,
    ManageStudioServicePage,
    ManageInvoicePage,
    CreateInvoicePage,
    ViewInvoicePage,
} from '@/features/studio';
import { Login } from '@/features/auth';
import { SystemDashboard, SystemManageStudio, SystemManageUser } from '@/features/system';
import AuthProvider from '@/providers/AuthProvider';

export default function AppRoutes() {
    return (
        <Router>
            <AuthProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/" index element={<Navigate to={'/login'} />}></Route>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="/system" element={<SystemLayout />}>
                            <Route index element={<Navigate to={'/system/dashboard'} />}></Route>
                            <Route path="/system/dashboard" element={<SystemDashboard />}></Route>
                            <Route path="/system/manage-users" element={<SystemManageUser />}></Route>
                            <Route path="/system/manage-studios" element={<SystemManageStudio />}></Route>
                            <Route path="/system/manage-category" element={<div>System manage category</div>}></Route>
                            <Route path="/system/manage-blogs" element={<div>System manage logs</div>}></Route>
                            <Route path="/system/manage-rolebase" element={<div>Sytem manage Role, Permission</div>} />
                        </Route>
                        <Route path="/studio" element={<StudioLayout />}>
                            <Route index element={<Navigate to={'/studio/dashboard'} />}></Route>
                            <Route path="/studio/dashboard" element={<StudioDashBoard />}></Route>
                            <Route path="/studio/manage-user" element={<StudioMangeUser />}></Route>
                            <Route path="/studio/manage-studio" element={<ManageStudio />}></Route>
                            <Route path="/studio/manage-scheduleworking" element={<ManageScheduleArtistPage />}></Route>
                            <Route path="/studio/manage-appointment" element={<ManageStudioAppointmentPage />}></Route>
                            <Route path="/studio/manage-service" element={<ManageStudioServicePage />}></Route>
                            <Route path="/studio/manage-invoice">
                                <Route index element={<ManageInvoicePage />}></Route>
                                <Route path="/studio/manage-invoice/create" element={<CreateInvoicePage />}></Route>
                                <Route
                                    path="/studio/manage-invoice/view/:invoiceId"
                                    element={<ViewInvoicePage />}
                                ></Route>
                            </Route>
                        </Route>
                        <Route path="/studio/preview-studio" element={<PreviewStudioPage />}></Route>
                    </Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="*" element={<Error />}></Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
