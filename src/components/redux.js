const initialState = {
  list: [],
  popUp: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN":
      return { ...state, popUp: true, list: action.data };
    case "CLOSE":
      return { ...state, popUp: false };
  }
  return state;
};
