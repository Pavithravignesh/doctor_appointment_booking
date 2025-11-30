import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { About, Contact, Doctors, Home, Login, MyProfile, MyAppiontment, Appointments } from './pages'
import { Footer, Navbar } from './components'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppiontment />} />
        <Route path='/appointments/:docId' element={<Appointments />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
