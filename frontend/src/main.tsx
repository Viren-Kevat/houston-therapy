import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Wake up the Render backend on page load (free-tier servers sleep after inactivity)
fetch('https://houston-therapy.onrender.com/api/health', { mode: 'cors' }).catch(
  () => {} // silently ignore errors
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
