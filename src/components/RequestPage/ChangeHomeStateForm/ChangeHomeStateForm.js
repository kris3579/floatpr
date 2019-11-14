import React from 'react';
import PropTypes from 'prop-types';

export default class ChangeStateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      state: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleChangeHomeState(this.state.user, this.state.state.toUpperCase());
    this.setState({
      user: '',
      state: '',
    });
  }

  render() {
    return (
      <>
        <h3 className='requestPrompt'>Enter Home State(WA), Territory(BC), or Country(JPN)</h3>
      
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='user' className='requestInput' placeholder='Your Tag' onChange={(event) => this.props.handleChange(event, this)} required/>
          <input type='text' name='state' className='requestInput' placeholder='Your State/Region (3 letters max)' onChange={(event) => this.props.handleChange(event, this)} pattern='[A-Za-z]{2,3}' required/>

          <button type='submit' className='requestButton'>Submit</button>
        </form>
      </>
    );
  }
}

ChangeStateForm.propTypes = {
  handleChange: PropTypes.func,
  handleChangeHomeState: PropTypes.func,
};
