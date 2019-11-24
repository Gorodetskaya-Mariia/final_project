import axios from "axios";
import { updateObject } from "../utility";
import {
  ADD_USER_DATA_START,
  ADD_USER_DATA_SUCCESS,
  ADD_USER_DATA_FAIL
} from "./types";

export const addUserDataStart = () => {
  return {
    type: ADD_USER_DATA_START
  };
};

export const addUserDataSuccess = (id, formValues, userId) => {
  return {
    type: ADD_USER_DATA_SUCCESS,
    userDataId: id,
    userData: formValues,
    userId: userId
  };
};

export const addUserDataFail = error => {
  return {
    type: ADD_USER_DATA_FAIL,
    error: error
  };
};

export const addUserData = (formValues, userId, token) => async dispatch => {
  const payload = updateObject(formValues, {
    userId: userId
  });
  dispatch(addUserDataStart());
  axios
    .post(
      "https://react-beauty-salon-cacbe.firebaseio.com/userData.json?auth=" +
        token,
      payload
    )
    .then(response => {
      dispatch(addUserDataSuccess(response.data.username, formValues, userId));
    })
    .catch(error => {
      dispatch(addUserDataFail(error));
    });
};
