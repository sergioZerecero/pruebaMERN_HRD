import { Route, Routes } from 'react-router-dom'
import Principal from './pages/Principal'
import Login from './pages/login'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<Principal />} path='/*' />
    </Routes>
  )
}

export default App
