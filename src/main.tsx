import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AppProvider from './components/AppProvider/AppProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>,
)
