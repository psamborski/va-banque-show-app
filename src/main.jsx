import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoundView from './views/RoundView/RoundView.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<></>} />
              <Route path="round/:roundNum" element={<RoundView />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
