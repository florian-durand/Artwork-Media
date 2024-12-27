import React from "react";
import "./Header.css"

export default function Header(props: { showLoginPage: () => void }) {


    return (<div className="header">
        <div className="searchBar">
            a
        </div>
        <div className="name">
            My Mind
        </div>
        <div className="login">
            <button className="login-button" onClick={() => { props.showLoginPage() }}>Login</button>
        </div>
    </div>)
}