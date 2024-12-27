import React, { useState, useEffect, useRef } from "react";
import "./Login.css"

export default function Login(props: { onConnect: () => void }) {
    return (<div className="login-container">
        <input type="text"></input>
        <input type="text"></input>
        <button onClick={() => { props.onConnect() }} className="connect-button">Connect</button>
    </div>)
}