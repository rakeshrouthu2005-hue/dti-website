
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Optimize React rendering with concurrent features
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

// Use concurrent mode for better performance
const root = createRoot(rootElement);

// Render immediately without StrictMode in production for better performance
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(<App />);
}
