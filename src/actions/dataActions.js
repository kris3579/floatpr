const storeData = (data, dataSetType) => {
  return {
    type: 'STORE_DATA',
    payload: data,
    dataSet: dataSetType,
  };
};

export default storeData;
