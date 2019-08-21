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
      request:'',
    };
  };
  
  handleChange = (event, component) => {
    event.preventDefault();
    const { name, value } = event.target;
    component.setState({
      [name]: value,
    });
  };

  handleRequest = (event) => {
    this.setState({
      request: event.target.value,
    });
  };

  handleAddTournament = (tournamentUrl) => {
    this.setState({
      request: `Your request to add the tournament located at ${tournamentUrl} has been submitted.`,
    });

    superagent.post('http://localhost:3579/userRequest')
      .set('Content-Type', 'application/json')
      .send(`{"requestType":"addTournament","tournamentURL":"${tournamentUrl}"}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };
  
  handleChangeMains = (user, color, main, requestText) => {
    const formattedName = this.formatName(main);
    this.setState({
      request: `Your request to ${requestText} mains has been submitted. Main: ${formattedName}, Color: ${color}`,
    });
    
    const despacedName = formattedName.replace(/\s/g, '');
    const newMain = color += despacedName;
    
    let doWeDelete = null;
    
    if (requestText === 'replace') {
      doWeDelete = true;
    } else if (requestText === 'add to') {
      doWeDelete = false;
    }
    
    superagent.post('http://localhost:3579/userRequest')
    .set('Content-type', 'application/json')
    .send(`{"requestType":"editMains","user":"${user}","newMain":"${newMain}","doWeDelete":"${doWeDelete}"}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw error;
    });
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
    this.setState({
      request: `Your request to change the home state/region of ${user} to ${state} has been submitted.`
    });

    superagent.post('http://localhost:3579/userRequest')
      .set('Content-Type', 'application/json')
      .send(`{"requestType":"editState","user":"${user}","state":"${state}"}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      })
  };

  handleCombineResults = (userTag, secondTag) => {
    this.setState({
      request: `Your request to merge the results of ${secondTag} into your main tag ${userTag} has been submitted.`,
    });

    superagent.post('http://localhost:3579/userRequest')
      .set('Content-Type', 'application/json')
      .send(`{"requestType":"combineResults","userTag":"${userTag}","secondTag":"${secondTag}"}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
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

    switch(this.state.request) {
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
        displayedForm = <></>;
    }

    return (
      <div>
        <p>User Request Form</p>

        <div className='chooseRequest'>
          <form>
            <label className='requestLabel'>
              <input className='requestOptions' type='radio' name='requestOptions' value='addTournament' onChange={this.handleRequest}/>
              Add An Unaccounted For Tournament
            </label>
            <br/>
          
            <label className='requestLabel'>
              <input className='requestOptions' type='radio' name='requestOptions' value='changeMains' onChange={this.handleRequest}/>
              Add/Change Mains
            </label>
            <br/>
          
            <label className='requestLabel'>
              <input className='requestOptions' type='radio' name='requestOptions' value='changeHomeState' onChange={this.handleRequest}/>
              Change A Player's State/Region
            </label>
            <br/>
            
            <label className='requestLabel'>
              <input className='requestOptions' type='radio' name='requestOptions' value='combineResults' onChange={this.handleRequest}/>
              Combine Results of Two Tags
            </label>
          </form>
        </div>

        {displayedForm}
      </div>
    );
  };
};