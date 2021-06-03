import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listCategories } from "../actions/categoryActions"

const Menu = () => {
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCategories()) // this will fireoff the categoryAction.js (listCategory that will fetch data)
  }, [dispatch])

  const renderCategories = (categories) => {
    const mycategory = []
    categories.map((category) =>
      mycategory.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={`/search/${category.slug}`}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      )
    )
    return mycategory
  }

  return (
    <div id="menu-header">
      {categories.length > 0 ? <ul>{renderCategories(categories)}</ul> : null}
    </div>
  )
}

export default Menu
