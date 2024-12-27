import React, { useEffect, useState } from "react"
import Category from "./Category.tsx"
import AddCategory from "./AddCategory.tsx"
import "./Categories.css"

export default function Categories() {
    const [categories, setCategories] = useState([])

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

    return (
        <div >
            {categories.map((element, i) => <Category key={i} id={element[0]} name={element[1]} onRemoveCategory={onRemoveCategory} onUpdateCategory={onUpdateCategory}></Category>)
            }
            <AddCategory onClick={onAddCategory}></AddCategory >
        </div >
    )

}