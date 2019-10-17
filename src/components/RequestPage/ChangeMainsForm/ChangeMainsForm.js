import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import ChangeMainsInput from './ChangeMainsInput/ChangeMainsInput';

export default class ChangeMainsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      currentCharacters: [{ character: '', color: '' }],
    };
  }

  handleCharacterChange = (event, index, type) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({
      currentCharacters: update(this.state.currentCharacters, { 
        [index]:
          {
            [type]: {
              $set: value,
            },
          },
      }),
    });
  }

  handleAddMainInput = () => {
    const newCurrentCharacters = [...this.state.currentCharacters];
    newCurrentCharacters.push({ character: '', color: '' });

    this.setState({ currentCharacters: newCurrentCharacters });
  }

  handleDeleteMainInput = (index) => {
    const newCurrentCharacters = this.state.currentCharacters;
    newCurrentCharacters.splice(index, 1);

    this.setState({ currentCharacters: newCurrentCharacters });
  }
  
  handleSubmitRequest = (event) => {
    event.preventDefault();
    
    this.props.handleChangeMains(this.state.user, this.state.currentCharacters);
  };

  render() {
    const addAnotherMainButton = this.state.currentCharacters > 2 ? null
      : <button type='button' onClick={this.handleAddMainInput}>Add Another Main</button>;

    return (
      <div>
        <h3>Add to or Replace your mains, Enter New Main and Color</h3>

        <form onSubmit={this.handleSubmitRequest}>
          {addAnotherMainButton}

          <input type='text' placeholder='Your Tag' name='user' onChange={(event) => this.props.handleChange(event, this)} required/>
          
          {
            this.state.currentCharacters.map((character, i) => {
              return (
                <div key={i}>
                  <ChangeMainsInput
                    currentCharacters={this.state.currentCharacters}
                    currentCharacterIndex={i}
                    handleCharacterChange={this.handleCharacterChange}
                    handleDeleteMainInput={this.handleDeleteMainInput}
                  />
                </div>
              );
            })
          }

          <button type='submit' className='requestButton'>Submit</button>
        </form>
      </div>
    );
  }
}

ChangeMainsForm.propTypes = {
  handleChangeMains: PropTypes.func,
  handleChange: PropTypes.func,
};
