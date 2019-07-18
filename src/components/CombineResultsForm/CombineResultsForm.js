import React from 'react';
import PropTypes from 'prop-types';

export default class CombineResultsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userTag: '',
      secondTag: '',
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
    this.props.handleCombineResults(this.state.userTag, this.state.secondTag);
    this.setState({
      user: '',
      secondTag: '',
    });
  };

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Main Tag' name='userTag' onChange={this.handleChagne} required/>
          <input type='text' placeholder='Tag to Merge' name='secondTag' onChange={this.handleChange} required/>
          
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  };
};

CombineResultsForm.propTypes = {
  handleCombineResults: PropTypes.func,
};