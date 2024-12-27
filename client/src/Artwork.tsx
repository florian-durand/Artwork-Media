import React, { useState, useEffect } from 'react';
import "./Artwork.css"

export default function Artwork(props: { key: number, position: number, id: number, title: string, description: string, imagePath: string, link: string, onClick: (id) => void, onSave: (id, title, description, imagePath, link, imageFile) => void, onDragStart: (e, id, imagePath) => void, onDragEnter: (id) => void, onDragEnd: () => void }) {
    const [isEditing, setIsEditing] = useState(false)
    const [id, setId] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imagePath, setImagePath] = useState("")
    const [link, setLink] = useState("")
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        setId(props.id)
        setTitle(props.title);
        setDescription(props.description);
        setImagePath(props.imagePath);
        setLink(props.link);
    }, [props.id, props.title, props.description, props.imagePath, props.link]);

    return isEditing ?
        <div className="container">
            <img className="image" src={imagePath} alt={imagePath} draggable="false" />
            <input type="text" className="title-input" name="Title" defaultValue={title} onChange={(v) => (setTitle(v.target.value))} />
            <input type="file" className="file-input-hide" id="file-selection" accept="image/*" onChange={(event) => {
                setImagePath(URL.createObjectURL(event.target.files[0]));
                setImageFile(event.target.files[0])
            }} />
            <textarea className="description-input" defaultValue={description} onChange={(v) => { setDescription(v.target.value) }} />
            <input type="text" className="link-input" defaultValue={link} onChange={(v) => { setLink(v.target.value) }} />
            <button className="file-input" title="Upload" onClick={() => { document.getElementById('file-selection')?.click() }} >Select Image</button>
            <button className="button" title="Save" onClick={() => { setIsEditing(!isEditing); props.onSave(id, title, description, imagePath, link, imageFile) }}> Save</button >
        </div >
        :

        <div draggable className="container" onDragEnd={() => { props.onDragEnd() }} onDragOver={(e) => e.preventDefault()} onDragStart={(e) => { props.onDragStart(e, props.position, imagePath); }} onDragEnter={(e) => { props.onDragEnter(props.position) }} onMouseEnter={() => { setIsDescriptionVisible(true) }} onMouseLeave={() => { setIsDescriptionVisible(false) }}>
            <div className={isDescriptionVisible ? "filter" : ""}>
                <img className="image" src={imagePath} alt={imagePath} draggable="false" />

                <b className="centered" >{title}</b>


            </div>
            {isDescriptionVisible ? <div> <div className="description">{props.description}</div> </div> : <></>
            }
            <a href={link}>
                <img className="link" src="link.png" alt="link" />
            </a>
            <button className="button" title="Edit" onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button className="removeButton" title="Remove" onClick={() => { props.onClick(id) }}>-</button>
        </div >
        ;
}
