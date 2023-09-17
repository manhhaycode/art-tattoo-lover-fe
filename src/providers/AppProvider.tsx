import { MantineProvider } from '@mantine/core';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return <MantineProvider withNormalizeCSS>{children}</MantineProvider>;
}
