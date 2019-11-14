import React from 'react';
import PropTypes from 'prop-types';

export default class ChangeSponserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      sponser: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleChangeSponser(this.state.user, this.state.sponser);
    this.setState({
      user: '',
      sponser: '',
    });
  }

  render() {
    return (
      <>
        <h3 className='requestPrompt'>Enter Desired Sponser</h3>

        <form onSubmit={this.handleSubmit}>
          <input type='text' name='user' className='requestInput' placeholder='Your Tag' onChange={(event) => this.props.handleChange(event, this)} required/>
          <input type='text' name='sponser' className='requestInput' placeholder='Sponser (16 letters max)' onChange={(event) => this.props.handleChange(event, this)} pattern='[A-za-z0-9]{2,16}' required/>

          <button type='submit' className='requestButton'>Submit</button>
        </form>
      </>
    );
  }
}

ChangeSponserForm.propTypes = {
  handleChange: PropTypes.func,
  handleChangeSponser: PropTypes.func,
};
