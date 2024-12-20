import React, { useState, useEffect, useRef } from "react";
import Artwork from "./Artwork.tsx";
import "./Artworks.css"
import AddButton from "./AddButon.tsx";

export default function Artworks() {
    const [data, setData] = useState([])
    const dataCopy = useRef([])
    const dragId = useRef(0)
    const otherDragId = useRef(0)

    const AddArtwork = () => {
        fetch('/add-empty-artwork',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    };

    const RemoveArtwork = (id) => {
        fetch('/remove-artwork',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    };

    const UpdateArtwork = (id, title, description, imagePath, link) => {
        return fetch('/update-artwork',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, title, description, imagePath, link })
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    }

    const OnDragStart = (id: number) => {
        dataCopy.current = structuredClone(data);
        dragId.current = id;
        console.log("édsq")
    };

    const OnDragEnter = (id: number) => {

        otherDragId.current = id;
        const newData = structuredClone(dataCopy.current);
        [newData[dragId.current], newData[otherDragId.current]] = [newData[otherDragId.current], newData[dragId.current]]
        console.log(dragId, otherDragId, newData)
        setData(newData)



    };

    const OnDragEnd = () => {
        let id1 = data[dragId.current][0]
        let position1 = data[dragId.current][5]
        let id2 = data[otherDragId.current][0]
        let position2 = data[otherDragId.current][5]

        fetch('/update-position',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id1, position1, id2, position2 })
            }).then(res => res.json()).then(data => setData(data)).catch(error => console.log(error))
    };

    useEffect(() => {
        fetch("/artworks").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return (<div className="artworks">{data.map((element, i: number) => <Artwork key={i} position={i} id={element[0]} title={element[1]} description={element[2]} imagePath={element[3]} link={element[4]} onClick={RemoveArtwork} onSave={UpdateArtwork} onDragStart={OnDragStart} onDragEnter={OnDragEnter} onDragEnd={OnDragEnd}></Artwork>)}<AddButton OnClick={AddArtwork}></AddButton></div>);
}