import React, { useState } from "react";
import "./Login.css"

export default function Login(props: { onConnect: (login, password) => void, onCreateAccount: (login, password) => void }) {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    return (<div className="login-container">
        <input className="login-inputs" type="text" onChange={(v) => setLogin(v.target.value)}></input>
        <input className="login-inputs" type="text" onChange={(v) => setPassword(v.target.value)}></input>
        <button onClick={() => { props.onConnect(login, password) }} className="connect-button">Connect</button>
        <button onClick={() => { props.onCreateAccount(login, password) }} className="connect-button">Create Account</button>
    </div>)
}