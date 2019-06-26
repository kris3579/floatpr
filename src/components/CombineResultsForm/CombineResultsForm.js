import React from 'react';
import PropTypes from 'prop-types';

export default class CombineResultsForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleCombineResults(event.currentTarget.firstTag.value, event.currentTarget.secondTag.valuei);
  };

  render() {  
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='firstTag' placeholder='First Tag' required/>
          <input type='text' name='secondTag' placeholder='Second Tag' required/>

          <button type='submit'>Combine Results</button>
        </form>
      </div>
    );
  };
};

CombineResultsForm.propTypes = {
  handleCombineResults: PropTypes.func,
};