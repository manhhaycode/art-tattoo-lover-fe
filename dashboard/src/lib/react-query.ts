import { DefaultOptions } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
    },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });

export default queryClient;
