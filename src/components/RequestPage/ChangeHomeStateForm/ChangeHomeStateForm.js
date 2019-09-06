import React from 'react';
import PropTypes from 'prop-types';

export default class ChangeStateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.user = '';
    this.state.state = '';
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleChangeHomeState(this.state.user, this.state.state.toUpperCase());
    this.setState({
      user: '',
      state: '',
    });
  };

  render() {
    return (
      <>
        <h3>Enter Home State(WA), Territory(BC), or Country(JPN)</h3>
      
        <form onSubmit={this.handleSubmit}>
          
          <input type='text' name='user' placeholder='Your Tag' onChange={(event) => this.props.handleChange(event, this)} required/>
          <input type='text' name='state' placeholder='Your State/Region' onChange={(event) => this.props.handleChange(event, this)} pattern='[A-Za-z]{2,3}' required/>

          <button type='submit' className='requestButton'>Submit</button>
        </form>
        </>
    );
  };
};

ChangeStateForm.propTypes = {
  handleChangeHomeState: PropTypes.func,
  handleChange: PropTypes.func,
};