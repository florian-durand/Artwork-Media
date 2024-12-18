import React, { useState } from 'react';
import "./Artwork.css"

export default function Artwork(props: { title: string, description: string, imagePath: string }) {
    const [isEditing, setIsEditing] = useState(false)

    return isEditing ?
        (<div>
            <button title="Save" onClick={() => setIsEditing(!isEditing)}>Save</button>
        </div>)
        :
        (
            <div className="container">
                <img className="image" src={props.imagePath} alt="image" />
                <div className="centered">
                    <b>{props.title}</b>
                </div>
                <button className="button" title="Edit" onClick={() => setIsEditing(!isEditing)}>Edit</button>
            </div>
        );
}
