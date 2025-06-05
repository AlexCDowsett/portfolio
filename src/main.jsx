import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <NextUIProvider>
        <App />
        <Analytics />
      </NextUIProvider>
  </StrictMode>,
)
