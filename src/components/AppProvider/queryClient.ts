import { QueryClient } from "@tanstack/react-query";

/**
 * Default Configuration with performance optimizations * 
 * - `staleTime`: 1 minute
 * - `gcTime`: 5 minutes
 * - `retry`: 1 retry on failure
 * - `refetchOnWindowFocus`: false (better UX)
*/ 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,                                                         
      gcTime: 5 * 60 * 1000,                                                        
      retry: 1,
      refetchOnWindowFocus: false,                                                        
    },
    mutations: {
      retry: 1,
    },
  },
});

export default queryClient;