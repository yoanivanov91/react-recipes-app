import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from'react-query/devtools';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer position="bottom-right" autoClose={3000} theme='colored' />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
