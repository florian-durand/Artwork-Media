import React from 'react';
import "./AddButton.css"

export default function AddButton(props: { OnClick: () => void }) {

    return (<div onClick={props.OnClick} className="addButton">
        <img src="plus-square-solid.svg" alt="plus icon" className="plus" />
    </div>);
}