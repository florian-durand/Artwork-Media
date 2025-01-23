import React, { useEffect, useState } from "react"
import Category from "./Category.tsx"
import AddCategory from "./AddCategory.tsx"
import "./Categories.css"

export default function Categories(props: { userLogin: string, canEdit: boolean }) {
    const [categories, setCategories] = useState([])
    const [userFound, setUserFound] = useState(false)
    const [dragId, setDragId] = useState(0)

    useEffect(() => {
        fetch(`/categories?userLogin=${props.userLogin}`).then(
            res => res.json()
        ).then(
            data => {
                if (data[0] === "Not Found") { setUserFound(false) } else { setCategories(data); setUserFound(true); }
            }
        )
    }, [props.userLogin])

    const onAddCategory = () => {
        const userLogin = props.userLogin
        fetch(`/add-empty-category`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userLogin })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const onRemoveCategory = (id) => {
        const userLogin = props.userLogin
        fetch(`/remove-category`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, userLogin })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const onUpdateCategory = (id, name) => {
        const userLogin = props.userLogin
        fetch(`/update-category`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, userLogin })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    }

    const AddArtwork = (id) => {
        const userLogin = props.userLogin
        fetch(`/add-empty-artwork`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, userLogin })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))
    };


    const RemoveArtwork = (artworkId, categoryId) => {
        const userLogin = props.userLogin
        fetch(`/remove-artwork`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artworkId, userLogin })
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
        formData.append("userLogin", props.userLogin)
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
        const userLogin = props.userLogin
        fetch(`/update-position`,
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, position, category, userLogin })
            }).then(res => res.json()).then(data => setCategories(data)).catch(error => console.log(error))

    };

    return (
        <div >
            {userFound ? <div>{categories.map((element, i) => <Category key={i} id={element[0]} name={element[1]} onRemoveCategory={onRemoveCategory} onUpdateCategory={onUpdateCategory} items={element[2]} addArtwork={AddArtwork} removeArtwork={RemoveArtwork} updateArtwork={UpdateArtwork} onDragStart={OnDragStart} onDragEnter={OnDragEnter} canEdit={props.canEdit}></Category>)
            }
                {props.canEdit ? <AddCategory onClick={onAddCategory}></AddCategory> : <div></div>}</div> : <div className="user-not-found">User Not found</div>}

        </div >
    )

}