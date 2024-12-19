import React, { useState, useEffect } from 'react';
import "./Artwork.css"
import APIService from './APIService.tsx';

export default function Artwork(props: { id: number, title: string, description: string, imagePath: string, link: string, onClick: (id) => void }) {
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

    const updateArtwork = () => { APIService.InsertArtwork({ id, title, description, imagePath, link }) };

    return isEditing ?
        <div className="container">
            <img className="image" src={imagePath} alt={imagePath} />
            <input type="text" className="title-input" name="Title" defaultValue={title} onChange={(v) => (setTitle(v.target.value))} />
            <button className="button" title="Save" onClick={() => { setIsEditing(!isEditing); updateArtwork() }}> Save</button >
            <button className="removeButton" title="Remove" onClick={() => { setIsEditing(!isEditing); props.onClick(id) }}>-</button>
        </div >
        :

        <div className="container" onMouseEnter={() => { setIsDescriptionVisible(true) }} onMouseLeave={() => { setIsDescriptionVisible(false) }}>
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
