export default (state = {}, { type, payload, dataSet }) => {
  switch(type) {
    case 'STORE_DATA':
      const newState = Object.assign({}, state);
      newState[dataSet] = payload;
      return newState;
    default:
      return state;
  };
};