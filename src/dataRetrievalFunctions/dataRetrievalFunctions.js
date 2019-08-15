import superagent from 'superagent';

export default class DataRetrievalFunctions {
  playersData(props) {
    return new Promise((resolve, reject) => {

      if (!props.playersObject) {
        return superagent.get('http://localhost:3579/getPlayers')
        .then((response) => {
          props.storeDataFunction(response.body, 'players');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (props.playersObject) {
        resolve(props.playersObject);
      }
      
      reject('Something went wrong');
    });
  };

  setsData(props) {
    return new Promise((resolve, reject) => {
      
      if (!props.sets) {
        return superagent.get('http://localhost:3579/getSets')
        .then((response) => {
          props.storeDataFunction(response.body, 'sets');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (props.sets) {
        resolve(props.sets);
      }

      reject('Something went wrong');
    });
  };

  tournamentsData(props) {
    return new Promise((resolve, reject) => {
      
      if (!props.tournaments) {
        return superagent.get('http://localhost:3579/getTournaments')
        .then((response) => {
          props.storeData(response.body, 'tournaments');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (props.tournaments) {
        resolve(props.tournaments);
      }

      reject('Something went wrong');
    });
  };
};