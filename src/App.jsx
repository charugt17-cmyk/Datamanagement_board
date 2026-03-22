// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import DataGrid from './pages/DataGrid';
import FileUpload from './pages/FileUpload';

function App() { 

  return (
    <Routes>
      <Route path='/' element={<DataGrid />} />
      <Route path='/Upload' element={<FileUpload />} />
    </Routes>
  )
}

export default App
