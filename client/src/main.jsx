import {React,StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <App />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)