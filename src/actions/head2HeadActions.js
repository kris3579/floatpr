const storeData = (data, name, head2HeadType) => {
  return {
    type: 'STORE_HEAD2HEAD_DATA',
    payload: data,
    name,
    head2HeadType,
  };
};

export default storeData;
