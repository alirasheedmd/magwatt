import React, { useState, useEffect } from "react"
import { Form, Button, Table, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { createProductSku, listProductDetails } from "../actions/productAction"
import axios from "axios"
import { PRODUCT_CREATE_SKU_RESET } from "../constants/productContants"

const Sku = ({ product, productId }) => {
  const [skuId, setSkuId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [uploading, setUploading] = useState("")
  const [countInStock, setCountInStock] = useState("")
  const [createSkuForm, setCreateSkuForm] = useState(false)

  const productSkuCreate = useSelector((state) => state.productSkuCreate)
  const { success, loading } = productSkuCreate
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_SKU_RESET })
    if (success) {
      dispatch(listProductDetails(productId))
      setCreateSkuForm(false)
    }
  }, [dispatch, success])

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
    const createSku = {
      skuId,
      name,
      price,
      countInStock,
      color,
      size,
      image,
    }
    dispatch(createProductSku(createSku, productId))
  }

  const createSkuHandler = () => {
    setCreateSkuForm(true)
  }
  return (
    <>
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
                  <th>Stock In Count</th>
                  <th>Color</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {product.skus.map((sku) => (
                  <tr key={sku._id}>
                    <td>{sku.skuId}</td>
                    <td>{sku.name}</td>
                    <td>${sku.price}</td>
                    <td>{sku.countInStock}</td>
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
      {success && <Message variant="success">SKU Created</Message>}
      {createSkuForm && (
        <FormContainer>
          <h1>Create SKU</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>SKU-ID</Form.Label>
              <Form.Control
                type="text"
                value={skuId}
                onChange={(e) => setSkuId(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="text"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
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
        </FormContainer>
      )}
    </>
  )
}

export default Sku
