import React from 'react';
import PropTypes from 'prop-types';

export default class CombineResultsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userTag: '',
      secondTag: '',
    };
  }

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
        <h3>Merge a Tag`&apos;`s Results Into Another</h3>

        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Main Tag' name='userTag' onChange={(event) => this.props.handleChange(event, this)} required/>
          <input type='text' placeholder='Tag to Merge' name='secondTag' onChange={(event) => this.props.handleChange(event, this)} required/>
          
          <button type='submit' className='requestButton'>Submit</button>
        </form>
      </div>
    );
  }
};

CombineResultsForm.propTypes = {
  handleChange: PropTypes.func,
  handleCombineResults: PropTypes.func,
};
