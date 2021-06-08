import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Table, Row, Col } from "react-bootstrap"
import { deleteProduct, listProducts } from "../actions/productAction"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { PRODUCT_CREATE_RESET } from "../constants/productContants"
import Paginate from "../components/Paginate"

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push("/login")
    } else {
      dispatch(listProducts("", pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber])

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/admin/product/create`}>
            <Button variant="primary">Create Product</Button>
          </LinkContainer>
        </Col>
      </Row>
      {error && <Message variant="danger">{error}</Message>}

      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading || loadingDelete ? (
        <Loader />
      ) : (
        <>
          <Table bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Catagory</th>
                <th>Brand</th>
                <th>SKUs</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.numSkus}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}
export default ProductListScreen
