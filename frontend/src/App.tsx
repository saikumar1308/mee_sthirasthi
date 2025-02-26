
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Home } from './pages/home'
import { AllProperties } from './pages/allProperties'
import { Property } from './pages/Property'
import { SellingPage } from './pages/sellingPage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/home' element={<Home />} />
        <Route path='/properties/:selection' element={<AllProperties />}/>
        <Route path='/properties/:selection/:id' element={<Property />}/>
        <Route path='/properties/sell' element={<SellingPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
