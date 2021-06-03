import slugify from "slugify"
import Category from "../models/categoryModel.js"
import asyncHandler from "express-async-handler"

const createCategories = (categories, parentId = null) => {
  // we have 2 types of parent categories that one that have a parent id and some that do not have a parent id.
  const categoryLists = []
  let category
  if (parentId === null) {
    category = categories.filter((cat) => cat.parentId == undefined) // here we are filtering the categories which are without parent id so the result will be undefiend
  } else {
    category = categories.filter((cat) => cat.parentId == parentId) // and if the parent id is there then get those categories
  }
  for (let cate of category) {
    categoryLists.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    })
  }
  return categoryLists
}

// Create Category
// POST /api/category/
// admin only

const createCategory = asyncHandler(async (req, res) => {
  const { name, parentId } = req.body

  const categoryObj = {
    name,
    slug: slugify(name),
  }

  if (parentId) {
    categoryObj.parentId = parentId
  }

  const createdCategory = await Category.create(categoryObj)
  if (createdCategory) {
    res.status(201).json(createdCategory)
  } else {
    res.status(400)
    throw Error("something went wrong")
  }
})

// GET api/category/
// Desc - GET Category
// Admin only

const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find()
  if (categories) {
    const categoryList = createCategories(categories)

    res.status(200).json(categoryList)
  } else {
    res.status(400)
    throw Error("Categories not found")
  }
})

export { createCategory, getCategory }
