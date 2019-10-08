export default (state = {}, { type, payload, dataSet }) => {
  switch (type) {
    case 'STORE_DATA':
      const newState = { ...state };
      newState[dataSet] = payload;
      return newState;
    default:
      return state;
  }
};
