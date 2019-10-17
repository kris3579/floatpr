export default (state = {}, { 
  type, 
  payload, 
  name, 
  head2HeadType,
}) => {
  let newState;
  let newProperty;

  switch (type) {
    case 'STORE_HEAD2HEAD_DATA':
      newState = { ...state };
      newProperty = { ...newState[head2HeadType] };
      newProperty[name] = payload;
      newState[head2HeadType] = newProperty;
      return newState;
    default:
      return state;
  }
};
