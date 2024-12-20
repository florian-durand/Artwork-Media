import React from 'react';
import "./AddButton.css"

export default function AddButton(props: { OnClick: () => void }) {

    return (<div onClick={props.OnClick} className="addButton">
        <div className="plus">+</div>
    </div>);
}