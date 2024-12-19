import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
// import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { Routes } from './routes/index.tsx';
import { AuthProvider } from './context/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
