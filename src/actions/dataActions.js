const storeData = (data, dataSet) => {
  return {
    type: 'STORE_DATA',
    payload: data,
    dataSet: dataSet,
  };
};

export default storeData;