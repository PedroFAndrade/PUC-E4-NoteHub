import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Primary from "./pages/primary/primary";
import reportWebVitals from './reportWebVitals';
import Sign from "./pages/sign/sign";
import { SidebarProvider } from './connections/requisitions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Sign />} />   
            <Route path="/primary" element={<Primary />} />
          </Routes>
        </SidebarProvider>
      </Router>
  </React.StrictMode>

);

reportWebVitals();
