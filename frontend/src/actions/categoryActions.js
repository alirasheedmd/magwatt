import axios from "axios"
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants"

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST }) //first the action will fire off the request reducer

    const { data } = await axios.get(`/api/category`)

    dispatch({
      type: CATEGORY_LIST_SUCCESS, // this will fill in the payload with the fetched product data.
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST }) //first the action will fire off the request reducer

    await axios.post(`/api/category`, category)

    dispatch({
      type: CATEGORY_CREATE_SUCCESS, // this will fill in the payload with the fetched product data.
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
