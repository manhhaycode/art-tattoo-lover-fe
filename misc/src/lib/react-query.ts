import { DefaultOptions } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/react-query';
import { ErrorAuth } from './error';

const queryConfig: DefaultOptions = {
    queries: {
        // useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
            if ((error as Error).message === ErrorAuth.AT_INVALID) return true;
            else if (failureCount < 2) return true;
            else return false;
        },
        retryDelay: 0,
    },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });

export default queryClient;
