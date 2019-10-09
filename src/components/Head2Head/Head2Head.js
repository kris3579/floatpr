import React from 'react';
import PropTypes from 'prop-types';

import Top10Head2Head from './Top10Head2Head/Top10Head2Head';

export default class Head2Head extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.player1 = '';
    this.state.player2 = '';
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push(`/headToHead/${this.state.player1}/${this.state.player2}`);
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
          <h3>Find Head to Head Data Between Two Players</h3>
          
          <form onSubmit={this.handleSubmit}>

            <input type='text' name='player1' placeholder='player1' onChange={(event) => this.handleChange(event)} required/>
            <input type='text' name='player2' placeholder='player2' onChange={(event) => this.handleChange(event)} required/>
          
            <button type='submit' className='requestButton'>Submit</button>
          </form>
        </div>

        <Top10Head2Head/>
      </>
    );
  }
}

Head2Head.propTypes = {
  history: PropTypes.shape,
};
