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
          throw error;
        });
    }
  };
  
  handleChangeMains = (user, main1, main2, main3) => {
    const confirmation = this.handleConfirmRequest();

    if (confirmation === true) {
      if (main3.character !== '') {
        const formattedName1 = this.formatName(main1.character);
        const formattedName2 = this.formatName(main2.character);
        const formattedName3 = this.formatName(main3.character);

        this.setState({
          request: '',
          submittedRequest: `Your request to change mains has been submitted. First: ${formattedName1}, Color: ${main1.color},
            Second: ${formattedName2}, Color: ${main2.color}, Third: ${formattedName3}, Color: ${main3.color}`,
        });

        const despacedName1 = formattedName1.replace(/\s/g, '');
        const despacedName2 = formattedName2.replace(/\s/g, '');
        const despacedName3 = formattedName3.replace(/\s/g, '');

        const firstMain = `${main1.color} ${despacedName1}`;
        const secondMain = `${main2.color} ${despacedName2}`;
        const thirdMain = `${main3.color} ${despacedName3}`;

        return superagent.post('http://localhost:3579/userRequest')
          .set('Content-Type', 'application/json')
          .send(`{"requestType":"editMains","user":"${user}","firstMain":"${firstMain}","secondMain":"${secondMain}","thirdMain":"${thirdMain}"}`)
          .catch((error) => {
            throw error;
          });
      }
    }
      
    if (main2.character !== '') {
      const formattedName1 = this.formatName(main1.character);
      const formattedName2 = this.formatName(main2.character);

      this.setState({
        request: '',
        submittedRequest: `Your request to change mains has been submitted. First: ${formattedName1}, Color: ${main1.color},
            Second: ${formattedName2}, Color: ${main2.color}`,
      });

      const despacedName1 = formattedName1.replace(/\s/g, '');
      const despacedName2 = formattedName2.replace(/\s/g, '');

      const firstMain = `${main1.color} ${despacedName1}`;
      const secondMain = `${main2.color} ${despacedName2}`;

      return superagent.post('http://localhost:3579/userRequest')
        .set('Content-Type', 'application/json')
        .send(`{"requestType":"editMains","user":"${user}","firstMain":"${firstMain}","secondMain":"${secondMain}"`)
        .catch((error) => {
          throw error;
        });
    }

    const formattedName1 = this.formatName(main1.character);

    this.setState({
      request: '',
      submittedRequest: `Your request to change mains has been submitted. First: ${formattedName1}, Color: ${main1.color}`,
    });
    const despacedName1 = formattedName1.replace(/\s/g, '');

    const firstMain = `${main1.color} ${despacedName1}`;

    return superagent.post('http://localhost:3579/userRequest')
      .set('Content-Type', 'application/json')
      .send(`{"requestType":"editMains","user":"${user}","firstMain":"${firstMain}"}`)
      .catch((error) => {
        throw error;
      });
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
          throw error;
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
          throw error;
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
