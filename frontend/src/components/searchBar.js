import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { searchProducts } from "../actions/productAction"
import { PRODUCT_SEARCH_RESET } from "../constants/productContants"

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("")
  const [timeOutId, setTimeOutId] = useState("")
  const [visible, setVisible] = useState(true)

  const productSearch = useSelector((state) => state.productSearch)
  const { products } = productSearch

  const menuRef = useRef()

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
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setVisible(false)
      }
    }
    document.addEventListener("mousedown", handler)

    if (keyword === "") {
      setVisible(true)
      dispatch({ type: PRODUCT_SEARCH_RESET })
      clearTimeout(timeOutId)
    }

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [dispatch, keyword, timeOutId, visible])

  const fetchProducts = (keyword) => {
    dispatch(searchProducts(keyword))
  }

  return (
    <>
      <form ref={menuRef} onSubmit={submitHandler}>
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
                if (keyword && visible) {
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
          visible && (
            <div className="search-result">
              <div className="match-list">
                {products.map((product) => (
                  <div className="container">
                    <img
                      className="match-list-image"
                      alt={`${product.name}`}
                      src={`${product.image}`}
                    />
                    <a
                      className="match-list-text"
                      href={`/product/${product._id}`}
                    >
                      {product.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </form>
    </>
  )
}

export default SearchBar
