import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainRouter } from "./router/MainRouter";
import { AuthProvider } from "@services/auth";

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        structuralSharing: false,
        gcTime: 60 * 1000 * 5,
        staleTime: 60 * 1000 * 4,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
};
