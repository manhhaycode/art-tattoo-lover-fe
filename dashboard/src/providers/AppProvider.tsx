// import Error from '@/components/common/Error';
import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './AuthProvider';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Error from '@/components/common/Error';
import { useThemeStore } from '@/store/componentStore';

// import { lightTheme } from '@/theme';

// const logError = (error: Error, info: { componentStack: string }) => {
//     console.error(error, info);
// };

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();
    return (
        <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<div className="h-screen w-screen bg-dark-theme"></div>}>
                <MantineProvider defaultColorScheme="dark" theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>{children}</AuthProvider>
                    </QueryClientProvider>
                </MantineProvider>
            </Suspense>
            <ToastContainer autoClose={3000} theme="colored" />
        </ErrorBoundary>
    );
}
