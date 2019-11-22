import React from 'react';
import PropTypes from 'prop-types';

export default class ChangeTagForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      newTag: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleChangeTag(this.state.user, this.state.newTag);
    this.setState({
      user: '',
      newTag: '',
    });
  }

  render() {
    return (
      <>
        <h3 className='requestPrompt'>Enter your currently stored tag and your new tag</h3>

        <form onSubmit={this.handleSubmit}>
          <input type='text' name='user' className='requestInput' placeholder='Your Tag' onChange={(event) => this.props.handleChange(event, this)} required/>
          <input type='text' name='newTag' className='requestInput' placeholder='New Tag' onChange={(event) => this.props.handleChange(event, this)} required/>
        
          <button type='submit' className='requestButton'>Submit</button>
        </form>
      </>
    );
  }
}

ChangeTagForm.propTypes = {
  handleChange: PropTypes.func,
  handleChangeTag: PropTypes.func,
};
