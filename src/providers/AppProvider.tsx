import Error from '@/components/common/Error';
import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<Error />}>
            <MantineProvider withNormalizeCSS>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </MantineProvider>
        </ErrorBoundary>
    );
}
