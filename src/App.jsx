import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './routes/home/home.component.jsx'
import Navigation from './routes/navigation/navigation.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'

function Shop() {
  return (
    <div>
      <p>Shop page...</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path='shop' element={<Shop />}/>
        <Route path='authentication' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;