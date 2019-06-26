import React from 'react';
import PropTypes from 'prop-types';

export default class CombineResultsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      inputText: '',
    };
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      inputText: event.target.value,
    });
  };

  handleUserTagSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.children[0].value);
    this.setState({
      user: event.currentTarget.children[0].value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleCombineResults(this.state.user, event.currentTarget.firstTag.value, event.currentTarget.secondTag.value);
    this.setState({
      user: '',
      inputText: '',
    });
  };

  render() {  
    const combineTagsForm = this.state.user === '' ? <div/> :
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='firstTag' placeholder='First Tag' required/>
        <input type='text' name='secondTag' placeholder='Second Tag' required/>

        <button type='submit'>Combine Results</button>
      </form>;

    return (
      <div>
        <form onSubmit={this.handleUserTagSubmit}>
          <input type='text' placeholder='Your Tag' onChange={this.handleUserTagChange}/>
          <button type='submit'>Submit</button>
        </form>

        {combineTagsForm}
      </div>
    );
  };
};

CombineResultsForm.propTypes = {
  handleCombineResults: PropTypes.func,
};