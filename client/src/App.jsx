import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SignupAndLogin from './components/userSignup'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignupAndLogin/>
    </>
  )
}

export default App
