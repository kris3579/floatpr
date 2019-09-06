import React from 'react';

import Top15Head2Head from './Top15Head2Head/Top15Head2Head';

export default class Head2Head extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.player1 = '';
    this.state.player2 = '';
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <>
        <div className='formDiv'>
          <h3>Enter two players to find their head 2 head</h3>
          
          <form onSubmit={this.handleSubmit}>

            <input type='text' name='Player 1' placeholder='Player 1' onChange={(event) => this.props.handleChange(event)} required/>
            <input type='text' name='Player 2' placeholder='Player 2' onChange={(event) => this.props.handleChange(event)} required/>
          
            <button type='submit' className='requestButton'>Submit</button>
          </form>
        </div>

        <Top15Head2Head/>
      </>
    );
  };
};