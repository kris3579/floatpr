import React from 'react';
import superagent from 'superagent';

import AddTournamentForm from './AddTournamentForm/AddTournamentForm';
import ChangeMainsForm from './ChangeMainsForm/ChangeMainsForm';
import ChangeHomeStateForm from './ChangeHomeStateForm/ChangeHomeStateForm';
import ChangeSponserForm from './ChangeSponserForm/ChangeSponserForm';
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
  }

  handleRequestChange = (event) => {
    this.setState({
      request: event.target.value,
      submittedRequest: '',
    });
  }

  handleConfirmRequest = () => {
    return window.confirm('Are you sure you would like to make this request?'); // eslint-disable-line
  }

  handleSendRequest = (submittedRequest, dataToSend) => {
    this.setState({
      request: '',
      submittedRequest,
    });

    superagent.post('http://localhost:3579/userRequest')
      .set('Content-Type', 'application/json')
      .send(dataToSend)
      .catch(() => {
        this.setState({
          submittedRequest: 'Attempt to send request unsuccessful',
        });
      });
  }

  handleAddTournament = (tournamentUrl) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const submittedRequest = `Your request to add the tournament located at ${tournamentUrl} has been submitted.`;
      const dataToSend = `{"requestType":"addTournament","tournamentURL":"${tournamentUrl}"}`;
      
      this.handleSendRequest(submittedRequest, dataToSend);
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
  
  handleChangeMains = (user, mains) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const dataToSend = {
        requestType: 'editMains',
        user,
      };

      let submittedRequest = 'Your request to change mains has been submitted.';

      mains.forEach((main, i) => {
        const formattedName = this.formatName(main.character);

        if (i === 0) {
          submittedRequest += ` Main: ${formattedName}, Color: ${main.color}`; 
          const despacedName = formattedName.replace(/\s/g, '');
          dataToSend.firstMain = `${main.color} ${despacedName}`;
        }

        if (i === 1) {
          submittedRequest += ` | Second: ${formattedName}, Color: ${main.color}`;
          const despacedName = formattedName.replace(/\s/g, '');
          dataToSend.secondMain = `${main.color} ${despacedName}`;
        }

        if (i === 2) {
          submittedRequest += ` | Third: ${formattedName}, Color: ${main.color}`;
          const despacedName = formattedName.replace(/\s/g, '');
          dataToSend.thirdMain = `${main.color} ${despacedName}`;
        }
      });

      this.handleSendRequest(submittedRequest, JSON.stringify(dataToSend));
    }
  }

  handleChangeHomeState = (user, state) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const submittedRequest = `Your request to change the home state/region of ${user} to ${state} has been submitted.`;
      const dataToSend = `{"requestType":"editState","user":"${user}","state":"${state}"}`;

      this.handleSendRequest(submittedRequest, dataToSend);
    }
  };

  handleChangeSponser = (user, sponser) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const submittedRequest = `Your request to change the sponser of ${user} to ${sponser} has been submitted.`;
      const dataToSend = `{"requestType":"editSponser","user":"${user}","sponser":"${sponser}"}`;

      this.handleSendRequest(submittedRequest, dataToSend);
    }
  };

  handleCombineResults = (userTag, secondTag) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      const submittedRequest = `Your request to merge the results of ${secondTag} into your main tag ${userTag} has been submitted.`;
      const dataToSend = `{"requestType":"combineResults","userTag":"${userTag}","secondTag":"${secondTag}"}`;

      this.handleSendRequest(submittedRequest, dataToSend);
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
    const changeSponserForm = <ChangeSponserForm
      handleChangeSponser={this.handleChangeSponser}
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
      case 'changeSponser':
        displayedForm = changeSponserForm;
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
          <select value={this.state.request} className='requestSelect' onChange={this.handleRequestChange} required>
            <option value='' disabled>Choose Request</option>
            <option value='changeMains'>Add/Change Mains</option>
            <option value='changeHomeState'>Change State/Region</option>
            <option value='changeSponser'>Add/Change Sponser</option>
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
