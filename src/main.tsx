import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './cases/cart/contexts/cart.context.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </QueryClientProvider>    
  </BrowserRouter>,
)
