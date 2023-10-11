import Error from '@/components/common/Error';
import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './AuthProvider';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Suspense } from 'react';

// const logError = (error: Error, info: { componentStack: string }) => {
//     console.error(error, info);
// };

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<Error />}>
            <MantineProvider
                withNormalizeCSS
                // theme={{
                //     colorScheme: 'dark',
                //     colors: {
                //         // override dark colors to change them for all components
                //         dark: [
                //             'black',
                //             '#acaebf',
                //             '#8c8fa3',
                //             '#666980',
                //             '#4d4f66',
                //             '#34354a',
                //             'white',
                //             '#1d1e30',
                //             '#0c0d21',
                //             '#01010a',
                //         ],
                //     },
                // }}
            >
                <Suspense fallback={<div className="h-screen w-screen bg-dark-theme"></div>}>
                    <LazyMotion features={domAnimation}>
                        <QueryClientProvider client={queryClient}>
                            <AuthProvider>{children}</AuthProvider>
                        </QueryClientProvider>
                    </LazyMotion>
                </Suspense>
            </MantineProvider>
        </ErrorBoundary>
    );
}
