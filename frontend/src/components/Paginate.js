import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Paginate = ({ pages, page, isAdmin = "false", keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) =>
          isAdmin ? (
            <LinkContainer key={x + 1} to={`/admin/productlist/${x + 1}`}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ) : (
            <LinkContainer
              key={x + 1}
              to={
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          )
        )}
      </Pagination>
    )
  )
}

export default Paginate
