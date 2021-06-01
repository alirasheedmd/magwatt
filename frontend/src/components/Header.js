import React, { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../actions/userActions"
import { useHistory, Route } from "react-router-dom"
import SearchBar from "./searchBar"
import { listCategories } from "../actions/categoryActions"

const Header = () => {
  const [display, setDisplay] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCategories()) // this will fireoff the categoryAction.js (listCategory that will fetch data)
  }, [dispatch])
  const logoutHandler = () => {
    dispatch(logout())
    history.push("/")
  }

  const renderCategories = (categories) => {
    const mycategory = []
    categories.map((category) =>
      mycategory.push(
        <li
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
          key={category.name}
          className="main-category-li"
        >
          {category.name}
          {display && category.children.length > 0 ? (
            <ul className="category">{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      )
    )
    return mycategory
  }
  const openMenu = () => {
    setDisplay(true)
  }
  const closeMenu = () => {
    setDisplay(false)
  }

  return (
    <header>
      <Navbar variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                className="brand"
                src="https://res.cloudinary.com/magwatt/image/upload/v1621681989/htnkhw49lsfpen1n0u19.png"
                fluid
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route
              render={({ history }) => (
                <SearchBar className="search-bar" history={history} />
              )}
            />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="menu">
        <ul className="main-category">{renderCategories(categories)}</ul>
      </div>
    </header>
  )
}

export default Header
