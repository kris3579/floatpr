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
  }

  setsData(props) {
    return new Promise((resolve, reject) => {      
      if (!props.setsArray) {
        return superagent.get('http://localhost:3579/getSets')
          .then((response) => {
            props.storeDataFunction(response.body, 'sets');
            resolve(response.body);
          })
          .catch((error) => {
            reject(error);
          });
      }
      
      if (props.setsArray) {
        resolve(props.setsArray);
      }

      reject('Something went wrong');
    });
  }

  tournamentsData(props) {
    return new Promise((resolve, reject) => {
      if (!props.tournamentsObject) {
        return superagent.get('http://localhost:3579/getTournaments')
          .then((response) => {
            props.storeDataFunction(response.body, 'tournaments');
            resolve(response.body);
          })
          .catch((error) => {
            reject(error);
          });
      }
      
      if (props.tournamentsObject) {
        resolve(props.tournamentsObject);
      }

      reject('Something went wrong');
    });
  }

  individualHead2HeadData(props) {
    return new Promise((resolve, reject) => {
      return superagent.get(`http://localhost:3579/getIndividualHead2Head/${props.player}`)
        .then((response) => {
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  pairHead2HeadData(props) {
    return new Promise((resolve, reject) => {
      return superagent.get(`http://localhost:3579/getPairHead2Head/${props.player1}/${props.player2}`)
        .then((response) => {
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  topPlayerHead2HeadData(props) {
    return new Promise((resolve, reject) => {
      if (!props.topPlayerHead2HeadObject) {
        return superagent.get('http://localhost:3579/getTopPlayerHead2Head')
          .then((response) => {
            props.storeDataFunction(response.body, 'topPlayerHead2Head');
            resolve(response.body);
          })
          .catch((error) => {
            reject(error);
          });
      }

      if (props.topPlayerHead2HeadObject) {
        resolve(props.topPlayerHead2HeadObject);
      }

      reject('Something went wrong');
    });
  }
}
