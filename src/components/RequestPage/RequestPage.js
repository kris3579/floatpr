import React from 'react';
import superagent from 'superagent';

import AddTournamentForm from '../AddTournamentForm/AddTournamentForm';
import ChangeMainsForm from '../ChangeMainsForm/ChangeMainsForm';
import ChangeStateForm from '../ChangeStateForm/ChangeStateForm';
import CombineResultsForm from '../CombineResultsForm/CombineResultsForm';

import './RequestPage.scss';

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

  handleChangeState = (user, state) => {
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
    const changeStateForm = <ChangeStateForm 
      handleChangeState={this.handleChangeState}
      handleChange={this.handleChange}  
    />;
    const combineResultsForm = <CombineResultsForm 
      handleCombineResults={this.handleCombineResults}
      handleChange={this.handleChange}
    />;

    const displayedForm = this.state.request === 'addTournament' ? addTournamentForm : this.state.request === 'changeMains' ? changeMainsForm : this.state.request === 'combineResults' ? combineResultsForm : this.state.request === 'changeState' ? changeStateForm : <div>{this.state.request}</div>;

    return (
      <div>
        <p>User Request Form</p>

        <div className='chooseRequest'>
          <form>
            <input className='requestOptions' type='radio' name='requestOptions' value='addTournament' onChange={this.handleRequest}/>
            <label className='requestOptions'>Add An Unaccounted For Tournament</label>
            <br/>
            
            <input className='requestOptions' type='radio' name='requestOptions' value='changeMains' onChange={this.handleRequest}/>
            <label className='requestOptions'>Add/Change Mains</label>
            <br/>
          
            <input className='requestOptions' type='radio' name='requestOptions' value='changeState' onChange={this.handleRequest}/>
            <label className='requestOptions'>Change A Player's State/Region</label>
            <br/>
            
            <input className='requestOptions' type='radio' name='requestOptions' value='combineResults' onChange={this.handleRequest}/>
            <label className='requestOptions'>Combine Results of Two Tags</label>
            <br/>
          </form>
        </div>

        {displayedForm}
      </div>
    );
  };
};