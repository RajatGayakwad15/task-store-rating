import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  QueryClientProvider,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
   
      <App />
      <Toaster />

  </QueryClientProvider>
);
