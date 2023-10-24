// import Error from '@/components/common/Error';
import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './AuthProvider';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

// import { lightTheme } from '@/theme';

// const logError = (error: Error, info: { componentStack: string }) => {
//     console.error(error, info);
// };

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<div>Lỗi</div>}>
            <MantineProvider
                theme={{
                    primaryColor: 'light-blue',
                    primaryShade: 4,
                    colors: {
                        'light-blue': [
                            '#e0fbff',
                            '#cbf2ff',
                            '#9ae2ff',
                            '#64d2ff',
                            '#3cc5fe',
                            '#23bcfe',
                            '#09b8ff',
                            '#00a1e4',
                            '#0090cd',
                            '#007cb5',
                        ],
                    },
                }}
            >
                <Suspense fallback={<div className="h-screen w-screen bg-dark-theme"></div>}>
                    <LazyMotion features={domAnimation}>
                        <QueryClientProvider client={queryClient}>
                            <AuthProvider>{children}</AuthProvider>
                        </QueryClientProvider>
                    </LazyMotion>
                </Suspense>
            </MantineProvider>
            <ToastContainer autoClose={3000} />
        </ErrorBoundary>
    );
}
