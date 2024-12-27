import React, { useState, useEffect, useRef } from "react";
import Artwork from "./Artwork.tsx";
import "./Category.css"
import AddButton from "./AddButon.tsx";

export default function Category(props: { key: number, id: number, name: string, onRemoveCategory: (id) => void, onUpdateCategory: (id, name) => void, items: [], addArtwork: (id) => void, removeArtwork: (artworkId, categoryId) => void, updateArtwork: (category_id, id, title, description, imagePath, link, imageFile) => void, onDragStart: (e, id, imagePath) => void, onDragEnter: (position, category) => void }) {
    const [data, setData] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")

    useEffect(() => {
        setName(props.name)
        setData(props.items)
    }, [props.items, props.name])

    return (
        <div className="category">
            <div className="category-title">
                {isEditing ? <input type="text" className="input-category-name" defaultValue={name} onChange={(v) => { setName(v.target.value) }} /> :
                    <div className="category-title-name">
                        {name}
                    </div>
                }
                {isEditing ? <img src='check-circle-solid.svg' alt="check circle" onClick={() => { props.onUpdateCategory(props.id, name); setIsEditing(!isEditing) }} className="edit-category" /> :
                    <img src='edit-pencil.svg' alt="edit pencil" onClick={() => { setIsEditing(!isEditing) }} className="edit-category" />
                }
                <img src='bin-minus-in.svg' alt="bin icon" onClick={() => { props.onRemoveCategory(props.id) }} className="remove-category" />
            </div>
            <div className="artworks">
                {data.map((element, i: number) => <Artwork key={i} category_id={props.id} position={i} id={element[0]} title={element[1]} description={element[2]} imagePath={element[3]} link={element[4]} onClick={props.removeArtwork} onSave={props.updateArtwork} onDragStart={props.onDragStart} onDragEnter={props.onDragEnter} ></Artwork>)}
                <AddButton id={props.id} OnClick={props.addArtwork} onDragEnter={props.onDragEnter}></AddButton>
            </div>
        </div>);
}