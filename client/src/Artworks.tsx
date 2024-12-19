import React, { useState, useEffect } from "react";
import Artwork from "./Artwork.tsx";
import "./Artworks.css"
import AddButton from "./AddButon.tsx";
import APIService from "./APIService.tsx";

export default function Artworks() {
    const [data, setData] = useState([])
    const [s, sets] = useState("")

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

    return (<div className="artworks">{data.map((element, i) => <Artwork key={i} id={element[0]} title={element[1]} description={element[2]} imagePath={element[3]} link={element[4]} onClick={RemoveArtwork}></Artwork>)}<AddButton OnClick={AddArtwork}></AddButton></div>);
}