import {
    PENDING_REVIEW_REQUEST,
    PENDING_REVIEW_SUCCESS,
    PENDING_REVIEW_FAIL,
    APPROVE_REVIEW_REQUEST,
    APPROVE_REVIEW_SUCCESS,
    APPROVE_REVIEW_FAIL,
    APPROVE_REVIEW_RESET,
    REJECT_REVIEW_REQUEST,
    REJECT_REVIEW_SUCCESS,
    REJECT_REVIEW_FAIL,
    REJECT_REVIEW_RESET
  } from "../actions/action.types";
  
  export const reviewListReducer = (state = {}, action) => {
    switch (action.type) {
      case PENDING_REVIEW_REQUEST:
        return { loading: true };
      case PENDING_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload.data
        };
      case PENDING_REVIEW_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };

  export const approveReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case APPROVE_REVIEW_REQUEST:
        return { loading: true };
      case APPROVE_REVIEW_SUCCESS:
        return {
          loading: false,
          approveMsg: action.payload.data
        };
      case APPROVE_REVIEW_FAIL:
        return { error: action.payload };
      case APPROVE_REVIEW_RESET:
        return { onApproveReset: true };
      default:
        return state;
    }
  }

  export const rejectReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case REJECT_REVIEW_REQUEST:
        return { loading: true };
      case REJECT_REVIEW_SUCCESS:
        return {
          loading: false,
          rejectMsg: action.payload.message
        };
      case REJECT_REVIEW_FAIL:
        return { error: action.payload };
      case REJECT_REVIEW_RESET:
        return { onRejectReset: true };
      default:
        return state;
    }
  }
  
//   export const categoryDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//       case DELETE_CATEGORY_REQUEST:
//         return { loading: true, deleteMsg: null };
//       case DELETE_CATEGORY_SUCCESS:
//         return { loading: false, success: true, deleteMsg: action.payload };
//       case RESET_DELETE_CATEGORY:
//         return {}
//       case DELETE_CATEGORY_FAIL:
//         return { loading: false, error: action.payload };
//       default:
//         return state;
//     }
//   }
  