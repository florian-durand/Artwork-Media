import React, { useEffect, useState } from "react"
import Category from "./Category.tsx"
import AddCategory from "./AddCategory.tsx"
import "./Categories.css"

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [dragId, setDragId] = useState(0)

    useEffect(() => {
        fetch("/categories").then(
            res => res.json()
        ).then(
            data => {
                setCategories(data)
                console.log(data)
            }
        )
    }, [])

    const onAddCategory = () => {
        fetch(`/add-empty-category`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const onRemoveCategory = (id) => {
        fetch(`/remove-category`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const onUpdateCategory = (id, name) => {
        fetch(`/update-category`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const AddArtwork = (id) => {
        fetch(`/add-empty-artwork`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    };


    const RemoveArtwork = (artworkId, categoryId) => {
        fetch(`/remove-artwork`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artworkId })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    };

    const UpdateArtwork = (category_id, id, title, description, imagePath, link, imageFile) => {
        const formData = new FormData()
        formData.append("file", imageFile)
        formData.append("id", id)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("imagePath", imagePath)
        formData.append("link", link)
        return fetch(`/update-artwork`,
            {
                'method': 'POST',
                body: formData
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const OnDragStart = (e, id: number, imagePath) => {
        const image = new Image()
        image.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        e.dataTransfer.setDragImage(image, 0, 0);
        setDragId(id)
    };

    const OnDragEnter = (position, category) => {
        const id = dragId
        fetch(`/update-position`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, position, category })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))

    };

    return (
        <div >
            {categories.map((element, i) => <Category key={i} id={element[0]} name={element[1]} onRemoveCategory={onRemoveCategory} onUpdateCategory={onUpdateCategory} items={element[2]} addArtwork={AddArtwork} removeArtwork={RemoveArtwork} updateArtwork={UpdateArtwork} onDragStart={OnDragStart} onDragEnter={OnDragEnter} ></Category>)
            }
            <AddCategory onClick={onAddCategory}></AddCategory >
        </div >
    )

}