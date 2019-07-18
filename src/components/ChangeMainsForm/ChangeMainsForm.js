import React from 'react';
import PropTypes from 'prop-types';

import characterColors from '../../assets/characterColors';

import './ChangeMainsForm.scss';

export default class ChangeMainsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      main: '',
      color: '',
      doWeDelete: '',
    };
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
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
    });
  };
  
  createColorForm = (main) => {
    return <select name='color' value={this.state.color} onChange={this.handleChange} required>
        <option value='' disabled>Choose Color</option>
        {
          characterColors[main].map((color, i) => {
            return (
              <option key={i}>{color}</option>
              )
            })
          }
      </select>;
  };

  render() {
    const colorForm = this.state.main === '' ? <div/> : this.createColorForm(this.state.main);

    return (
      <div>
        <form onSubmit={this.handleSubmitRequest}>
          <input type='text' placeholder='Your Tag' name='user' onChange={this.handleChange} required/>
          
          <select name='doWeDelete' value={this.state.doWeDelete} onChange={this.handleChange} required>
            <option value='' disabled>Add or Replace</option>
            <option value='add to'>Add To Mains</option>
            <option value='replace'>Replace Mains</option>
          </select>

          <select name='main' value={this.state.main} onChange={this.handleChange} required>
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

          {colorForm}

          <button type='submit'>Submit</button>
        </form>

      </div>
    );
  };
};

ChangeMainsForm.propTypes = {
  handleChangeMains: PropTypes.func,
};