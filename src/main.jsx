import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MascotProvider } from './context/MascotContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import {BrowserRouter} from 'react-router-dom'
import { CalculationProvider } from './context/CalculationContext.jsx'
import { ChartProvider } from './context/ChartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ChartProvider>
    <CalculationProvider>
    <AuthProvider>
   <MascotProvider>
   <BrowserRouter>
    <App />

    </BrowserRouter>
   
    </MascotProvider>

    </AuthProvider>
    </CalculationProvider>
    </ChartProvider>
    </React.StrictMode>



)


