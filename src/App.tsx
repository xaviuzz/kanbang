import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Kanbang from './components/kanbang/Kanbang'
import React from 'react'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Kanbang />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
