import React from 'react';
import superagent from 'superagent';

import ChangeMainsForm from '../ChangeMainsForm/ChangeMainsForm';
import CombineResultsForm from '../CombineResultsForm/CombineResultsForm';

export default class RequestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request:'',
    };
  };

  handleRequest = (event) => {
    this.setState({
      request: event.target.value,
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

  handleCombineResults = (user, firstTag, secondTag) => {
    this.setState({
      request: `Your request to combine the results of ${firstTag} and ${secondTag} has been submitted.`,
    });

    superagent.post('http://localhost:3579/userRequest')
      .set('Content-Type', 'application/json')
      .send(`{"requestType":"combineResults","user":"${user}","firstTag":"${firstTag}","secondTag":"${secondTag}"}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  render() {
    const changeMainsForm = <ChangeMainsForm handleChangeMains={this.handleChangeMains}/>;
    const combineResultsForm = <CombineResultsForm handleCombineResults={this.handleCombineResults}/>;
    const displayedForm = this.state.request === 'changeMains' ? changeMainsForm : this.state.request === 'combineResults' ? combineResultsForm : <div>{this.state.request}</div>;

    return (
      <div>
        <p>User Request Form</p>

        <form>
          <label>Add/Change Mains</label>
          <input type='radio' name='requestOptions' value='changeMains' onChange={this.handleRequest}></input>
          
          <label>Combine Results of Two Tags</label>
          <input type='radio' name='requestOptions' value='combineResults' onChange={this.handleRequest}></input>
        </form>

        {displayedForm}
      </div>
    );
  };
};