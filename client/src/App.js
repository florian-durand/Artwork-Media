import React, { useState } from 'react'
import Categories from './Categories.tsx'
import Header from './Header.tsx'
import Login from './Login.tsx'



function App() {
  const [showLogin, setShowLogin] = useState(false)

  const showLoginPage = () => { setShowLogin(!showLogin) };

  return (
    <div>
      <Header showLoginPage={showLoginPage}></Header>
      {showLogin ? <Login onConnect={showLoginPage}></Login> : <Categories></Categories>}

    </div>


  )

}

export default App