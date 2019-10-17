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
      });

      superagent.post('http://localhost:3579/userRequest')
        .set('Content-Type', 'application/json')
        .send(`{"requestType":"addTournament","tournamentURL":"${tournamentUrl}"}`)
        .catch((error) => {
          this.setState({
            submittedRequest: `Recieved ${error.status} error code!`,
          });
        });
    }
  };
  
  handleChangeMains = (user, mains) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const requestBody = {
        requestType: 'editMains',
        user,
      };

      let submittedRequest = 'Your request to change mains has been submitted.';

      mains.forEach((main, i) => {
        const formattedName = this.formatName(main.character);

        if (i === 0) {
          submittedRequest += ` Main: ${formattedName}, Color: ${main.color}`; 
          const despacedName = formattedName.replace(/\s/g, '');
          requestBody.firstMain = `${main.color} ${despacedName}`;
        }

        if (i === 1) {
          submittedRequest += ` | Second: ${formattedName}, Color: ${main.color}`;
          const despacedName = formattedName.replace(/\s/g, '');
          requestBody.secondMain = `${main.color} ${despacedName}`;
        }

        if (i === 2) {
          submittedRequest += ` | Third: ${formattedName}, Color: ${main.color}`;
          const despacedName = formattedName.replace(/\s/g, '');
          requestBody.thirdMain = `${main.color} ${despacedName}`;
        }
      });

      this.setState({
        request: '',
        submittedRequest,
      });

      superagent.post('http://localhost:3579/userRequest')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(requestBody))
        .catch((error) => {
          this.setState({
            submittedRequest: `Recieved ${error.status} error code!`,
          });
        });
    }
  }
  
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
      });
      superagent.post('http://localhost:3579/userRequest')
        .set('Content-Type', 'application/json')
        .send(`{"requestType":"editState","user":"${user}","state":"${state}"}`)
        .catch((error) => {
          this.setState({
            submittedRequest: `Recieved ${error.status} error code!`,
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
      });

      superagent.post('http://localhost:3579/userRequest')
        .set('Content-Type', 'application/json')
        .send(`{"requestType":"combineResults","userTag":"${userTag}","secondTag":"${secondTag}"}`)
        .catch((error) => {
          this.setState({
            submittedRequest: `Recieved ${error.status} error code!`,
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
          <select value={this.state.request} onChange={this.handleRequestChange} required>
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
