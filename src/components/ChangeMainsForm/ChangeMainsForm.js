import React from 'react';
import PropTypes from 'prop-types';

import characterColors from '../../assets/characterColors';

export default class ChangeMainsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      main: '',
      color: '',
      doWeDelete: '',
      inputText: ''
    };
  };

  handleUserTagChange = (event) => {
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

  handleChooseDoWeDelete = (event) => {
    event.preventDefault();
    this.setState({
      doWeDelete: event.target.value,
    });
  };

  handleChooseMain = (event) => {
    this.setState({
      main: event.target.value,
    });
  };

  handleChooseColor = (event) => {
    this.setState({
      color: event.target.value,
    });
  };
  
  createColorForm = (main) => {
    return <form>
      <select value={this.state.color} onChange={this.handleChooseColor}>
        <option value='' disabled>Choose Color</option>
        {
          characterColors[main].map((color, i) => {
            return (
              <option key={i}>{color}</option>
              )
            })
          }
      </select>
    </form>;
  };
  
  handleSubmitRequest = (event) => {
    event.preventDefault();
    console.log(this.state.user, this.state.color, this.state.main, this.state.doWeDelete)
    this.props.handleChangeMains(this.state.user, this.state.color, this.state.main, this.state.doWeDelete);
    this.setState({
      user: '',
      main: '',
      color: '',
      doWeDelete: '',
      inputText: '',
    });
  };

  render() {
    const doWeDeleteForm = this.state.user === '' ? <div/> :
      <form>
        <button type='radio' value='add to' onClick={this.handleChooseDoWeDelete}>Add To Mains</button>
        <button type='radio' value='replace' onClick={this.handleChooseDoWeDelete}>Replace Mains</button>
      </form>;

    const mainsForm = this.state.doWeDelete === '' ? <div/> : 
      <form>
        <select value={this.state.main} onChange={this.handleChooseMain}>
          <option value='' disabled>Choose Main</option>
          <option value='bowser'>Bowser</option>
          <option value='captainFalcon'>Captain Falcon</option>
          <option value='docterMario'>Docter Mario</option>
          <option value='donkeyKong'>Donkey Kong</option>
          <option value='falco'>Falco</option>
          <option value='fox'>Fox</option>
          <option value='gameAndWatch'>Game & Watch</option>
          <option value='ganondorf'>Ganondorf</option>
          <option value='iceClimbers'>Ice Climbers</option>
          <option value='jigglypuff'>Jigglypuff</option>
          <option value='kirby'>Kirby</option>
          <option value='link'>Link</option>
          <option value='luigi'>Luigi</option>
          <option value='mario'>Mario</option>
          <option value='marth'>Marth</option>
          <option value='mewtwo'>Mewtwo</option>
          <option value='ness'>Ness</option>
          <option value='peach'>Peach</option>
          <option value='pichu'>Pichu</option>
          <option value='pikachu'>Pikachu</option>
          <option value='roy'>Roy</option>
          <option value='samus'>Samus</option>
          <option value='sheik'>Sheik</option>
          <option value='yoshi'>Yoshi</option>
          <option value='youngLink'>Young Link</option>
          <option value='zelda'>Zelda</option>
        </select>
      </form>;

    const colorForm = this.state.main === '' ? <div/> : this.createColorForm(this.state.main);
    const submitButton = this.state.color === '' ? <div/> :
      <form onSubmit={this.handleSubmitRequest}>
        <button type='submit'>Submit Request</button>
      </form>;


    return (
      <div>
        <form onSubmit={this.handleUserTagSubmit}>
          <input type='text' placeholder='Your Tag' onChange={this.handleUserTagChange}/>
          <button type='submit'>Submit</button>
        </form>

        {doWeDeleteForm}

        {mainsForm}

        {colorForm}

        {submitButton}
      </div>
    );
  };
};

ChangeMainsForm.propTypes = {
  handleChangeMains: PropTypes.func,
};