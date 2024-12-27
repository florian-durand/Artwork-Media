import React, { useState, useEffect, useRef } from "react";
import Artwork from "./Artwork.tsx";
import "./Category.css"
import AddButton from "./AddButon.tsx";

export default function Category(props: { key: number, id: number, name: string, onRemoveCategory: (id) => void, onUpdateCategory: (id, name) => void }) {
    const [data, setData] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const dataCopy = useRef([])
    const dragId = useRef(0)
    const otherDragId = useRef(0)

    const AddArtwork = () => {
        fetch(`/add-empty-artwork?category_id=${encodeURIComponent(props.id)}`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    };

    const RemoveArtwork = (id) => {
        fetch(`/remove-artwork?category_id=${encodeURIComponent(props.id)}`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    };

    const UpdateArtwork = (id, title, description, imagePath, link, imageFile) => {
        const formData = new FormData()
        formData.append("file", imageFile)
        formData.append("id", id)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("imagePath", imagePath)
        formData.append("link", link)
        return fetch(`/update-artwork?category_id=${encodeURIComponent(props.id)}`,
            {
                'method': 'POST',
                body: formData
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    }

    const OnDragStart = (e, id: number, imagePath) => {
        dataCopy.current = structuredClone(data);
        dragId.current = id;
        const image = new Image()
        image.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        e.dataTransfer.setDragImage(image, 0, 0);
    };

    const OnDragEnter = (id: number) => {

        otherDragId.current = id;
        const newData = structuredClone(dataCopy.current);
        [newData[dragId.current], newData[otherDragId.current]] = [newData[otherDragId.current], newData[dragId.current]]
        setData(newData)
    };

    const OnDragEnd = () => {
        let id1 = data[dragId.current][0]
        let position1 = data[dragId.current][5]
        let id2 = data[otherDragId.current][0]
        let position2 = data[otherDragId.current][5]

        fetch(`/update-position?category_id=${encodeURIComponent(props.id)}`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id1, position1, id2, position2 })
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    };

    useEffect(() => {
        fetch(`/artworks?category_id=${encodeURIComponent(props.id)}`).then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
        setName(props.name)
    }, [props.id, props.name])

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
                {data.map((element, i: number) => <Artwork key={i} position={i} id={element[0]} title={element[1]} description={element[2]} imagePath={element[3]} link={element[4]} onClick={RemoveArtwork} onSave={UpdateArtwork} onDragStart={OnDragStart} onDragEnter={OnDragEnter} onDragEnd={OnDragEnd} ></Artwork>)}
                <AddButton OnClick={AddArtwork}></AddButton>
            </div>
        </div>);
}