import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  userData: [],
	loading: false,
	update: true
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

const fetchUserDataSuccess = (state, action) => {
  return updateObject(state, {
		userData: action.userData,
		update: true
  });
};

const fetchUserDataFail = (state, action) => {
  return state;
};

const updateUserDataSuccess = (state, action) => {
  const newUserData = updateObject(action.userData, {
    id: action.userDataId,
    userId: action.userId
  });
  return updateObject(state, {
    loading: false,
    userData: state.userData.concat(newUserData)
  });
};

const updateUserDataFail = (state, action) => {
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
    case actionTypes.FETCH_USER_DATA_SUCCESS:
      return fetchUserDataSuccess(state, action);
    case actionTypes.FETCH_USER_DATA_FAIL:
			return fetchUserDataFail(state, action);
			case actionTypes.UPDATE_USER_DATA_SUCCESS:
				return updateUserDataSuccess(state, action);
			case actionTypes.UPDATE_USER_DATA_FAIL:
				return updateUserDataFail(state, action);
    default:
      return state;
  }
};

export default reducer;
