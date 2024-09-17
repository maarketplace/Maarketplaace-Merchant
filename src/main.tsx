import './global/styles.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ThemeProvider } from './context/DarkTheme.tsx';
import { MerchantProvider } from './context/GetMerchant.tsx';
import "./index.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MerchantProvider>
          <App />
        </MerchantProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
