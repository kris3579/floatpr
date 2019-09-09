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
    console.log(this.state);
    this.props.history.push(`/headToHead/${this.state.player1}/${this.state.player2}`);
  };

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

            <input type='text' name='player1' placeholder='player1' onChange={(event) => this.handleChange(event)} required/>
            <input type='text' name='player2' placeholder='player2' onChange={(event) => this.handleChange(event)} required/>
          
            <button type='submit' className='requestButton'>Submit</button>
          </form>
        </div>

        {/* <Top15Head2Head/> */}
      </>
    );
  };
};