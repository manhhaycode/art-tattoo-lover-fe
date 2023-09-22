import queryClient from '@/lib/react-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider withNormalizeCSS>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </MantineProvider>
    );
}
