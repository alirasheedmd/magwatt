import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchProducts } from "../actions/productAction"
import { PRODUCT_SEARCH_RESET } from "../constants/productContants"

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("")
  const [timeOutId, setTimeOutId] = useState("")

  const productSearch = useSelector((state) => state.productSearch)
  const { products } = productSearch

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/`)
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (keyword === "") {
      dispatch({ type: PRODUCT_SEARCH_RESET })
      clearTimeout(timeOutId)
    }
  }, [dispatch, keyword, timeOutId])

  const fetchProducts = (keyword) => {
    dispatch(searchProducts(keyword))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          className="searchBox"
          value={keyword}
          placeholder="Search Products..."
          onChange={(e) => {
            setKeyword(e.target.value)

            if (timeOutId) {
              clearTimeout(timeOutId)
            }
            setTimeOutId(
              //this delay is called debounce as we call it after
              setTimeout(() => {
                if (keyword) {
                  fetchProducts(keyword)
                } else {
                }
              }, 1000)
            )
          }}
        />
        {!keyword ? (
          <></>
        ) : (
          <div className="search-result">
            <div className="match-list">
              {products.map((product) => (
                <div className="container">
                  <img
                    className="match-list-image"
                    alt={`${product.name}`}
                    src={`${product.image}`}
                  />
                  <p className="match-list-text">{product.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </>
  )
}

export default SearchBar
