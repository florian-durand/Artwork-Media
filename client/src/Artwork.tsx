import React, { useState, useEffect } from 'react';
import "./Artwork.css"
import APIService from './APIService.tsx';

export default function Artwork(props: { key: number, position: number, id: number, title: string, description: string, imagePath: string, link: string, onClick: (id) => void, onSave: (id, title, description, imagePath, link) => void, onDragStart: (id) => void, onDragEnter: (id) => void, onDragEnd: () => void }) {
    const [isEditing, setIsEditing] = useState(false)
    const [id, setId] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imagePath, setImagePath] = useState("")
    const [link, setLink] = useState("")
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

    useEffect(() => {
        setId(props.id)
        setTitle(props.title);
        setDescription(props.description);
        setImagePath(props.imagePath);
        setLink(props.link);
    }, [props.id, props.title, props.description, props.imagePath, props.link]);

    return isEditing ?
        <div className="container">
            <img className="image" src={imagePath} alt={imagePath} />
            <input type="text" className="title-input" name="Title" defaultValue={title} onChange={(v) => (setTitle(v.target.value))} />
            <button className="button" title="Save" onClick={() => { setIsEditing(!isEditing); props.onSave(id, title, description, imagePath, link) }}> Save</button >
            <button className="removeButton" title="Remove" onClick={() => { setIsEditing(!isEditing); props.onClick(id) }}>-</button>
        </div >
        :

        <div draggable className="container" onDragEnd={() => { props.onDragEnd() }} onDragOver={(e) => e.preventDefault()} onDragStart={() => { props.onDragStart(props.position) }} onDragEnter={() => { props.onDragEnter(props.position) }} onMouseEnter={() => { setIsDescriptionVisible(true) }} onMouseLeave={() => { setIsDescriptionVisible(false) }}>
            <img className="image" src={imagePath} alt={imagePath} />
            <div className="centered">
                <b >{title}</b>
            </div>
            <a href={link}>
                <img className="link" src="link.png" alt="link" />
            </a>
            {isDescriptionVisible ? <div className="description">{props.description}</div> : <></>}
            <button className="button" title="Edit" onClick={() => setIsEditing(!isEditing)}>Edit</button>
        </div>
        ;
}
