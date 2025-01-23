import React, { useState } from "react";
import "./Header.css"

export default function Header(props: { showLoginPage: () => void, setFoundUser: (login) => void, resetMainPage: () => void }) {
    const [searchUserLogin, setSearchUserLogin] = useState("")

    return (<div className="header">
        <div className="searchBar">
            <input className="search-input" type="text" onChange={(v) => { setSearchUserLogin(v.target.value) }}></input>
            <button className="search-button" onClick={() => { props.setFoundUser(searchUserLogin) }}>Search</button>
        </div>
        <div className="name" onClick={() => props.resetMainPage()} >
            My Mind
        </div>
        <div className="login">
            <button className="login-button" onClick={() => { props.showLoginPage() }}>Login</button>
        </div>
    </div>)
}