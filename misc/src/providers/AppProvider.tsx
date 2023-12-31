import Error from '@/components/common/Error';
import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './AuthProvider';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Suspense } from 'react';
import { useThemeStore } from '@/store/componentStore';
import { Toaster } from 'react-hot-toast';

// const logError = (error: Error, info: { componentStack: string }) => {
//     console.error(error, info);
// };

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();
    return (
        <ErrorBoundary fallback={<Error />}>
            <MantineProvider
                withNormalizeCSS
                theme={{
                    colorScheme: theme === 'light' ? 'light' : 'dark',
                    primaryColor: 'red',
                    primaryShade: 5,
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
            <Toaster
                toastOptions={{
                    className: 'font-semibold text-sm',
                    style: {
                        background: '#363636',
                        border: '3px solid #424249',
                        color: '#fff',
                    },
                }}
            />
        </ErrorBoundary>
    );
}
