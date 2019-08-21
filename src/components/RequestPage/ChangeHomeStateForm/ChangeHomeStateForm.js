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
    this.props.handleChangeHomeState(this.state.user, this.state.state);
    this.setState({
      user: '',
      state: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='user' placeholder='Your Tag' onChange={(event) => this.props.handleChange(event, this)} required/>

        <h3>Enter Home State(USA) Territory(Canada) or Country</h3>
        <input type='text' name='state' placeholder='Your State/Region' onChange={(event) => this.props.handleChange(event, this)} required/>

        <button type='submit'>Submit</button>
      </form>
    );
  };
};

ChangeStateForm.propTypes = {
  handleChangeHomeState: PropTypes.func,
  handleChange: PropTypes.func,
};