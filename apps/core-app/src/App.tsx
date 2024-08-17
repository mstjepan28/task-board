import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainRouter } from "./router/MainRouter";
import { AuthProvider } from "@services/auth";
import { FirebaseProvider } from "@services/firebase";
import { Toaster } from "@services/ui";

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
    <FirebaseProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MainRouter />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </FirebaseProvider>
  );
};
