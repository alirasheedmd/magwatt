import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import FormContainer from "../components/FormContainer"
import { createCategory } from "../actions/categoryActions"
import { useHistory } from "react-router"
import { CATEGORY_CREATE_RESET } from "../constants/categoryConstants"

const CategoryAddScreen = () => {
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { success } = categoryCreate

  const dispatch = useDispatch()
  const history = useHistory()

  const [parentCategory, setParentCategory] = useState("")
  console.log(parentCategory)
  const [subCategory, setSubCategory] = useState("")

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options
  }

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET })
    if (success) {
      history.push("/admin/productlist")
    }
  }, [success, history])

  const submitHandler = (e) => {
    e.preventDefault()
    const category = { parentCategory, subCategory }
    console.log(category)
    dispatch(createCategory(category))
  }

  return (
    <div>
      <Row>
        <Col>
          <h1>Add Category</h1>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="parentCategory">
                <Form.Label>Parent Category</Form.Label>
                <Form.Control
                  as="select"
                  value={parentCategory}
                  onChange={(e) => setParentCategory(e.target.value)}
                >
                  <option>Select...</option>
                  {createCategoryList(categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="childCategory">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Sub Category"
                  onChange={(e) => setSubCategory(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </div>
  )
}

export default CategoryAddScreen
