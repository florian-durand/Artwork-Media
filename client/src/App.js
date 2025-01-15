import React, { useState } from 'react'
import Categories from './Categories.tsx'
import Header from './Header.tsx'
import Login from './Login.tsx'



function App() {
  const [showLogin, setShowLogin] = useState(true)
  const [connectedUserLogin, setConnectedUserLogin] = useState("")
  const [pageLogin, setPageLogin] = useState("")

  const connect = (login, password) => {

    fetch(`/connect-user`,
      {
        'method': 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      }).then(res => res.json()).then(
        data => {
          if (data[0]) {
            setConnectedUserLogin(login)
            setPageLogin(login)
            setShowLogin(false)
          }
        }
      ).catch(error => console.log(error))

  };

  const createAccount = (login, password) => {

    fetch(`/create-account`,
      {
        'method': 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      }).then(res => res.json()).then(data => { setConnectedUserLogin(login); setPageLogin(login); setShowLogin(false); }).catch(error => console.log(error))
  };

  return (
    <div>
      <Header showLoginPage={() => { setShowLogin(true) }} setFoundUser={(login) => { setPageLogin(login); setShowLogin(false); console.log(login) }} resetMainPage={() => { setPageLogin(connectedUserLogin) }}></Header>
      {showLogin ? <Login onConnect={connect} onCreateAccount={createAccount}></Login> : <Categories userLogin={pageLogin} canEdit={pageLogin === connectedUserLogin}></Categories>}
    </div>


  )

}

export default App