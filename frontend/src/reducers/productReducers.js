import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_RESET,
  PRODUCT_CREATE_SKU_REQUEST,
  PRODUCT_CREATE_SKU_SUCCESS,
  PRODUCT_CREATE_SKU_FAIL,
  PRODUCT_CREATE_SKU_RESET,
  PRODUCT_DELETE_SKU_REQUEST,
  PRODUCT_DELETE_SKU_SUCCESS,
  PRODUCT_DELETE_SKU_FAIL,
} from "../constants/productContants"

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_SEARCH_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_SEARCH_RESET:
      return { loading: false, products: [] }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [], skus: [], category: {} } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true, success: false }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: action.payload, success: true } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true, success: false }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, product: action.payload, success: true } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      } // this will fetch the payload value from the productAction.js file.
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productSkuCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_SKU_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SKU_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_SKU_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_SKU_RESET:
      return {}
    default:
      return state
  }
}

export const productSkuDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_SKU_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SKU_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_SKU_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
