import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import RoundView from './views/RoundView/RoundView.jsx'
import FinalView from './views/FinalView/FinalView.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<></>} />
              <Route path="round/:roundNum" element={<RoundView />} />
              <Route path="final" element={<FinalView />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
