import React from 'react';
import "./AddButton.css"

export default function AddButton(props: { id: number, OnClick: (id) => void, onDragEnter: (position, category) => void }) {

    return (<div onClick={() => { props.OnClick(props.id) }} onDragEnter={() => { props.onDragEnter(0, props.id) }} className="addButton">
        <img src="plus-square-solid.svg" alt="plus icon" className="plus" />
    </div>);
}