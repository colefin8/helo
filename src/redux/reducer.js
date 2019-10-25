const initialState = {
  username: "",
  profilePic: ""
};

const UPDATE_USER = "UPDATE_USER";
const CLEAR_USER = "CLEAR_USER";

export function updateUser(username, profilePic) {
  console.log(username, profilePic);
  //not getting the correct username
  return {
    type: UPDATE_USER,
    payload: { username, profilePic }
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: {}
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        username: payload.username,
        profilePic: payload.profilePic
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}
