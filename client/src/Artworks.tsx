import React, { useState, useEffect } from "react";
import Artwork from "./Artwork.tsx";
import "./Artworks.css"
import AddButton from "./AddButon.tsx";
import APIService from "./APIService.tsx";

export default function Artworks() {
    const [data, setData] = useState([])

    const AddArtwork = () => {
        APIService.InsertEmptyArticle({});
        fetch("/artworks").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
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

    return (<div className="artworks">{data.map((element, i) => <Artwork key={i} id={element[0]} title={element[1]} description={element[2]} imagePath={element[3]} link={element[4]}></Artwork>)}<AddButton OnClick={AddArtwork}></AddButton></div>);
}