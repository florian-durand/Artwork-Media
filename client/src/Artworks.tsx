import React, { useState, useEffect } from "react";
import Artwork from "./Artwork.tsx";

export default function Artworks() {
    const [data, setData] = useState([])

    useEffect(() => {
        ""
        fetch("/artworks").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return (<div>{data.map((element) => <Artwork title={element[0]} description={element[1]} imagePath={element[2]}></Artwork>)}</div>);
}