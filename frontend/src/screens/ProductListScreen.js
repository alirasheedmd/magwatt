import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Table, Row, Col } from "react-bootstrap"
import { deleteProduct, listProducts } from "../actions/productAction"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { PRODUCT_CREATE_RESET } from "../constants/productContants"
import Paginate from "../components/Paginate"
import CheckboxTree from "react-checkbox-tree"
import Modal from "react-modal"
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDroprightCircle,
  IoIosArrowDropdown,
  IoIosCheckmarkCircleOutline,
  IoIosArrowDropright,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
} from "react-icons/io"
import "react-checkbox-tree/lib/react-checkbox-tree.css"

const ProductListScreen = ({ history, match }) => {
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

  const pageNumber = match.params.pageNumber || 1
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

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

  const renderCategories = (categories) => {
    const myCategories = []
    categories.map((category) => {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      })
    })
    return myCategories
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/admin/category/create`}>
            <Button variant="primary">Create Categories</Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <CheckboxTree
            nodes={renderCategories(categories)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            icons={{
              check: <IoIosCheckbox />,
              uncheck: <IoIosCheckboxOutline />,
              halfCheck: <IoIosCheckmarkCircleOutline />,
              expandClose: <IoIosArrowDroprightCircle />,
              expandOpen: <IoIosArrowDropdown />,
              expandAll: <IoIosArrowDropdown />,
              collapseAll: <IoIosArrowDropright />,
              parentClose: <IoIosArrowForward />,
              parentOpen: <IoIosArrowDown />,
              leaf: <IoIosAdd />,
            }}
          />
        </Col>
      </Row>
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
