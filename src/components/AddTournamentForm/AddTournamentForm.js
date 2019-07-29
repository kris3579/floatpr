import React from 'react';
import PropTypes from 'prop-types';

export default class AddTournamentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.tournamentURL = '';
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddTournament(this.state.tournamentURL);
    this.setState({
      tournamentURL: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='tournamentURL' placeholder='Tournament URL' onChange={(event) => this.props.handleChange(event, this)} required/>

        <button type='submit'>Submit</button>
      </form>
    );
  };
};

AddTournamentForm.propTypes = {
  handleAddTournament: PropTypes.func,
  handleChange: PropTypes.func,
};