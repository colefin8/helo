const initialState = {
  username: "",
  userId: "",
  profilePic: ""
};

const UPDATE_USER = "UPDATE_USER";

export function updateUser(userId, username, profilePic) {
  return {
    type: UPDATE_USER,
    payload: { userId, username, profilePic }
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        username: payload.username,
        userId: payload.userId,
        profilePic: payload.profilePic
      };
    default:
      return state;
  }
}
