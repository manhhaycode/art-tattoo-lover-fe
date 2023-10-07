import Error from '@/components/common/Error';
import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './AuthProvider';
import { LazyMotion, domAnimation } from 'framer-motion';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<Error />}>
            <MantineProvider withNormalizeCSS>
                <LazyMotion features={domAnimation}>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>{children}</AuthProvider>
                    </QueryClientProvider>
                </LazyMotion>
            </MantineProvider>
        </ErrorBoundary>
    );
}
