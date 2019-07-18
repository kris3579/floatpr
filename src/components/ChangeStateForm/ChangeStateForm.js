import React from 'react';
import PropTypes from 'prop-types';

export default class ChangeStateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      state: ''
    };
  };
  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleChangeState(this.state.user, this.state.state);
    this.setState({
      user: '',
      state: '',
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='user' placeholder='Your Tag' onChange={this.handleChange} required/>

          <h3>Enter Home State(USA) Territory(Canada) or Country</h3>
          <input type='text' name='state' placeholder='Your State/Region' onChange={this.handleChange} required/>

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  };
};

ChangeStateForm.propTypes = {
  handleChangeState: PropTypes.func,
}