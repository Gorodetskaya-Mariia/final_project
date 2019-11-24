import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  userData: [],
  loading: false
};

const addUserDataStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addUserDataSuccess = (state, action) => {
  const newUserData = updateObject(action.userData, {
    id: action.userDataId,
    userId: action.userId
  });
  return updateObject(state, {
    loading: false,
    userData: state.userData.concat(newUserData)
  });
};

const addUserDataFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_DATA_START:
      return addUserDataStart(state, action);
    case actionTypes.ADD_USER_DATA_SUCCESS:
      return addUserDataSuccess(state, action);
    case actionTypes.ADD_USER_DATA_FAIL:
      return addUserDataFail(state, action);
    default:
      return state;
  }
};

export default reducer;
