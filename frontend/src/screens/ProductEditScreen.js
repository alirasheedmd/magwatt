import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Table, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { LinkContainer } from "react-router-bootstrap"
import {
  listProductDetails,
  listProducts,
  updateProduct,
} from "../actions/productAction"
import { PRODUCT_UPDATE_RESET } from "../constants/productContants"
import axios from "axios"

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState("")
  const [countInStock, setCountInStock] = useState("")

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push("/admin/productlist/")
    } else {
      if (!product.name || productId !== product._id) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setImage(product.image)
      }
    }
  }, [dispatch, product, productId, history, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "q4ihwqxa")
    setUploading(true)

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/magwatt/image/upload",
        formData
      )
      const { secure_url } = data
      setImage(secure_url)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const updatedProduct = {
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      image,
    }
    dispatch(updateProduct(updatedProduct, productId))
  }

  const createSkuHandler = () => {
    console.log("createSku")
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlid="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      <Row className="align-items-center">
        <Col>
          <h1>SKUs</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createSkuHandler}>
            <i className="fas fa-plus"></i> Create SKU
          </Button>
        </Col>
      </Row>
      <Row>
        {product.skus.length === 0 ? (
          <Message variant="primary">No SKUs</Message>
        ) : (
          <>
            <Table bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SKU ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Color</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {product.skus.map((sku) => (
                  <tr key={sku._id}>
                    <td>{sku._id}</td>
                    <td>{sku.name}</td>
                    <td>${sku.price}</td>
                    <td>{sku.quantity}</td>
                    <td>{sku.color}</td>
                    <td>{sku.size}</td>
                    <td>
                      <LinkContainer to={``}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        size="sm"
                        variant="danger"
                        // onClick={() => deleteSkuHandlerHandler(sku._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Row>
    </>
  )
}

export default ProductEditScreen
