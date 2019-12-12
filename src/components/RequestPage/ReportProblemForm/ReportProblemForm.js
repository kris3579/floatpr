import React from 'react';
import PropTypes from 'prop-types';

export default class ReportProblemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      problem: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleReportProblem(this.state.user, this.state.problem);
    this.setState({ user: '', problem: '' });
  }

  render() {
    return (
      <>
        <h3 className='requestPrompt'>Report a Problem/Bug</h3>

        <form onSubmit={this.handleSubmit}>
          <input type='text' name='user' className='requestInput' placeholder='Your Tag' onChange={(event) => this.props.handleChange(event, this)} required/>
          <input type='text' name='problem' className='requestInput' placeholder='Problem to Report (150 chars max)' onChange={(event) => this.props.handleChange(event, this)} patter='.*{4, 150}' required/>

          <button type='submit' className='requestButton'>Submit</button>
        </form>
      </>
    );
  }
}

ReportProblemForm.propTypes = {
  handleChange: PropTypes.func,
  handleReportProblem: PropTypes.func,
};
