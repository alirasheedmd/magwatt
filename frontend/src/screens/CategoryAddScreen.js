import React from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import FormContainer from "../components/FormContainer"

const CategoryAddScreen = () => {
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
            <Form>
              <Form.Group controlId="parentCategory">
                <Form.Label>Parent Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Select Parent Category"
                />
              </Form.Group>
              <Form.Group controlId="childCategory">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control type="text" placeholder="Enter Sub Category" />
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
