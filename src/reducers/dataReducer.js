export default (state = {}, { type, payload, dataSet }) => {
  let newState;

  switch (type) {
    case 'STORE_DATA':
      newState = { ...state };
      newState[dataSet] = payload;
      return newState;
    default:
      return state;
  }
};
