import React from 'react';
import AppRouter from './routers/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastContainer from './components/common/ToastContainer';

const options = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

function App() {
  const queryClient = new QueryClient(options);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppRouter />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
