import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { apolloClient } from './lib/apollo'
import { Router } from './Router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Router />
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export default App
