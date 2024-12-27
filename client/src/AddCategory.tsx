import React from 'react';
import "./AddCategory.css"


export default function AddCategory(props: { onClick: () => void }) {
    return (
        <button onClick={() => { props.onClick() }} className="add-category">Add Category</button>
    )
}