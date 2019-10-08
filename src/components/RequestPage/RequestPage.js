import React from 'react';
import superagent from 'superagent';

import AddTournamentForm from './AddTournamentForm/AddTournamentForm';
import ChangeMainsForm from './ChangeMainsForm/ChangeMainsForm';
import ChangeHomeStateForm from './ChangeHomeStateForm/ChangeHomeStateForm';
import CombineResultsForm from './CombineResultsForm/CombineResultsForm';

export default class RequestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request: '',
      submittedRequest: '',
    };
  }
  
  handleChange = (event, component) => {
    event.preventDefault();
    const { name, value } = event.target;
    component.setState({
      [name]: value,
    });
  };

  handleRequestChange = (event) => {
    this.setState({
      request: event.target.value,
      submittedRequest: '',
    });
  };

  handleConfirmRequest = () => {
    return window.confirm('Are you sure you would like to make this request?'); // eslint-disable-line
  }

  handleAddTournament = (tournamentUrl) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      this.setState({
        request: '',
        submittedRequest: `Your request to add the tournament located at ${tournamentUrl} has been submitted.`,
      })
        .then(() => {
          superagent.post('http://localhost:3579/userRequest')
            .set('Content-Type', 'application/json')
            .send(`{"requestType":"addTournament","tournamentURL":"${tournamentUrl}"}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              throw error;
            });
        });
    }
  };
  
  handleChangeMains = (user, color, main, requestText) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const formattedName = this.formatName(main);

      this.setState({
        request: '',
        submittedRequest: `Your request to ${requestText} mains has been submitted. Main: ${formattedName}, Color: ${color}`,
      })
        .then(() => {
          const despacedName = formattedName.replace(/\s/g, '');
          let newColor = color;
          const newMain = newColor += despacedName;
          
          let doWeDelete = null;
          
          if (requestText === 'replace') {
            doWeDelete = true;
          } else if (requestText === 'add to') {
            doWeDelete = false;
          }
          
          superagent.post('http://localhost:3579/userRequest')
            .set('Content-Type', 'application/json')
            .send(`{"requestType":"editMains","user":"${user}","newMain":"${newMain}","doWeDelete":"${doWeDelete}"}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              throw error;
            });
        });
    }
  };
  
  upperCase = (str) => {
    return str.toUpperCase();
  };

  formatName = (str) => {
    const name = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    const firstLetterOnWord = /(^|\s)[a-z]/g;
    return name.replace(firstLetterOnWord, this.upperCase);
  };

  handleChangeHomeState = (user, state) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      this.setState({
        request: '',
        submittedRequest: `Your request to change the home state/region of ${user} to ${state} has been submitted.`,
      })
        .then(() => {
          superagent.post('http://localhost:3579/userRequest')
            .set('Content-Type', 'application/json')
            .send(`{"requestType":"editState","user":"${user}","state":"${state}"}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              throw error;
            });
        });
    }
  };

  handleCombineResults = (userTag, secondTag) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      this.setState({
        request: '',
        submittedRequest: `Your request to merge the results of ${secondTag} into your main tag ${userTag} has been submitted.`,
      })
        .then(() => {
          superagent.post('http://localhost:3579/userRequest')
            .set('Content-Type', 'application/json')
            .send(`{"requestType":"combineResults","userTag":"${userTag}","secondTag":"${secondTag}"}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              throw error;
            });
        });
    }
  };

  render() {
    const addTournamentForm = <AddTournamentForm 
      handleAddTournament={this.handleAddTournament}
      handleChange={this.handleChange}  
    />;
    const changeMainsForm = <ChangeMainsForm 
      handleChangeMains={this.handleChangeMains}
      handleChange={this.handleChange}
    />;
    const changeHomeStateForm = <ChangeHomeStateForm 
      handleChangeHomeState={this.handleChangeHomeState}
      handleChange={this.handleChange}  
    />;
    const combineResultsForm = <CombineResultsForm 
      handleCombineResults={this.handleCombineResults}
      handleChange={this.handleChange}
    />;

    let displayedForm;

    switch (this.state.request) {
      case 'addTournament':
        displayedForm = addTournamentForm;
        break;
      case 'changeMains':
        displayedForm = changeMainsForm;
        break;
      case 'changeHomeState':
        displayedForm = changeHomeStateForm;
        break;
      case 'combineResults':
        displayedForm = combineResultsForm;
        break;
      default:
        displayedForm = <strong>Choose a request!</strong>;
    }

    return (
      <>
        <form>
          <select name='requestOptions' value={this.state.request} onChange={this.handleRequestChange} required>
            <option value='' disabled>Choose Request</option>
            <option value='changeMains'>Add/Change Mains</option>
            <option value='changeHomeState'>Change State/Region</option>
            <option value='combineResults'>Combine Results</option>
            <option value='addTournament'>Add Tournament</option>
          </select>
        </form>

        <div className='formDiv'>
          {displayedForm}
        </div>

        <strong>{this.state.submittedRequest}</strong>
      </>
    );
  }
}
