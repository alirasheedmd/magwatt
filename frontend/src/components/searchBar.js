import Axios from "axios"
import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { listProducts } from "../actions/productAction"

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("")
  const [timeOutId, setTimeOutId] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/`)
    }
  }

  const dispatch = useDispatch()

  const fetchProducts = async (keyword) => {
    dispatch(listProducts(keyword))
  }

  return (
    <Form inline onSubmit={submitHandler}>
      <Form.Group controlId="searchBox">
        <Form.Control
          className="search"
          type="text"
          name="search"
          value={keyword}
          className="mr-sm-2 ml-sm-5"
          placeholder="Search Products..."
          onChange={(e) => {
            setKeyword(e.target.value)

            if (timeOutId) {
              clearTimeout(timeOutId)
            }
            setTimeOutId(
              setTimeout(() => {
                fetchProducts(keyword)
              }, 1000)
            )
          }}
        />
      </Form.Group>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBar
