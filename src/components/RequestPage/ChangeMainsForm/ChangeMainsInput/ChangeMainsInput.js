import React from 'react';
import PropTypes from 'prop-types';

import characterColors from '../../../../assets/characterColors';

export default class ChangeMainsInput extends React.Component {
  checkForCharacter = (character) => {
    for (let i = 0; i < this.props.currentCharacters.length; i++) {
      if (this.props.currentCharacters[i].character === character) {
        return true;
      }
    }

    return false;
  }

  createColorForm = (character) => {
    const { currentCharacters, currentCharacterIndex } = this.props;
    const currentColor = currentCharacters[currentCharacterIndex].color;

    return <select name='color' value={currentColor} className='formSelect' onChange={(event) => this.props.handleCharacterChange(event, this.props.currentCharacterIndex, 'color')} required>
        <option value='' disabled>Choose Color</option>
        
        {
          characterColors[character].map((color, i) => {
            return (
              <option key={i}>{color}</option>
            );
          })
        }
    </select>;
  };

  render() {
    const { currentCharacters, currentCharacterIndex } = this.props;
    const currentCharacter = currentCharacters[currentCharacterIndex].character;

    const bowserOption = this.checkForCharacter('bowser') ? <option value='bowser' disabled>Bowser</option> : <option value='bowser'>Bowser</option>;
    const captainFalconOption = this.checkForCharacter('captainFalcon') ? <option value='captainFalcon' disabled>Captain Falcon</option> : <option value='captainFalcon'>Captain Falcon</option>;
    const doctorMarioOption = this.checkForCharacter('doctorMario') ? <option value='doctorMario' disabled>Doctor Mario</option> : <option value='doctorMario'>Doctor Mario</option>;
    const donkeyKongOption = this.checkForCharacter('donkeyKong') ? <option value='donkeyKong' disabled>Donkey Kong</option> : <option value='donkeyKong'>Donkey Kong</option>;
    const falcoOption = this.checkForCharacter('falco') ? <option value='falco' disabled>Falco</option> : <option value='falco'>Falco</option>;
    const foxOption = this.checkForCharacter('fox') ? <option value='fox' disabled>Fox</option> : <option value='fox'>Fox</option>;
    const gameAndWatchOption = this.checkForCharacter('gameAndWatch') ? <option value='gameAndWatch' disabled>Game & Watch</option> : <option value='gameAndWatch'>Game & Watch</option>;
    const ganondorfOption = this.checkForCharacter('ganondorf') ? <option value='ganondorf' disabled>Ganondorf</option> : <option value='ganondorf'>Ganondorf</option>;
    const iceClimbersOption = this.checkForCharacter('iceClimbers') ? <option value='iceClimbers' disabled>Ice Climbers</option> : <option value='iceClimbers'>Ice Climbers</option>;
    const jigglypuffOption = this.checkForCharacter('jigglypuff') ? <option value='jigglypuff' disabled>Jigglypuff</option> : <option value='jigglypuff'>Jigglypuff</option>;
    const kirbyOption = this.checkForCharacter('kirby') ? <option value='kirby' disabled>Kirby</option> : <option value='kirby'>Kirby</option>;
    const linkOption = this.checkForCharacter('link') ? <option value='link' disabled>Link</option> : <option value='link'>Link</option>;
    const luigiOption = this.checkForCharacter('luigi') ? <option value='luigi' disabled>Luigi</option> : <option value='luigi'>Luigi</option>;
    const marioOption = this.checkForCharacter('mario') ? <option value='mario' disabled>Mario</option> : <option value='mario'>Mario</option>;
    const marthOption = this.checkForCharacter('marth') ? <option value='marth' disabled>Marth</option> : <option value='marth'>Marth</option>;
    const mewtwoOption = this.checkForCharacter('mewtwo') ? <option value='mewtwo' disabled>Mewtwo</option> : <option value='mewtwo'>Mewtwo</option>;
    const nessOption = this.checkForCharacter('ness') ? <option value='ness' disabled>Ness</option> : <option value='ness'>Ness</option>;
    const peachOption = this.checkForCharacter('peach') ? <option value='peach' disabled>PPeach</option> : <option value='peach'>Peach</option>;
    const pichuOption = this.checkForCharacter('pichu') ? <option value='pichu' disabled>Pichu</option> : <option value='pichu'>Pichu</option>;
    const pikachuOption = this.checkForCharacter('pikachu') ? <option value='pikachu' disabled>Pikachu</option> : <option value='pikachu'>Pikachu</option>;
    const royOption = this.checkForCharacter('roy') ? <option value='roy' disabled>Roy</option> : <option value='roy'>Roy</option>;
    const samusOption = this.checkForCharacter('samus') ? <option value='samus' disabled>Samus</option> : <option value='samus'>Samus</option>;
    const sheikOption = this.checkForCharacter('sheik') ? <option value='sheik' disabled>Sheik</option> : <option value='sheik'>Sheik</option>;
    const yoshiOption = this.checkForCharacter('yoshi') ? <option value='yoshi' disabled>Yoshi</option> : <option value='yoshi'>Yoshi</option>;
    const youngLinkOption = this.checkForCharacter('youngLink') ? <option value='youngLink' disabled>Young Link</option> : <option value='youngLink'>Young Link</option>;
    const zeldaOption = this.checkForCharacter('zelda') ? <option value='zelda' disabled>Zelda</option> : <option value='zelda'>Zelda</option>;

    const colorForm = currentCharacter === '' ? null : this.createColorForm(currentCharacter);
    const deleteThisMainFormButton = this.props.currentCharacters.length < 2 ? null
      : <img className='removeImg' src={require('../../../../assets/delete.png')} onClick={() => this.props.handleDeleteMainInput(this.props.currentCharacterIndex)} alt='Red X'/>;
    
    return (
      <>
        <select name='character' value={currentCharacter} className='formSelect' onChange={(event) => this.props.handleCharacterChange(event, this.props.currentCharacterIndex, 'character')} required>
          <option value='' disabled>Choose Main</option>
          {bowserOption}
          {captainFalconOption}
          {doctorMarioOption}
          {donkeyKongOption}
          {falcoOption}
          {foxOption}
          {gameAndWatchOption}
          {ganondorfOption}
          {iceClimbersOption}
          {jigglypuffOption}
          {kirbyOption}
          {linkOption}
          {luigiOption}
          {marioOption}
          {marthOption}
          {mewtwoOption}
          {nessOption}
          {peachOption}
          {pichuOption}
          {pikachuOption}
          {royOption}
          {samusOption}
          {sheikOption}
          {yoshiOption}
          {youngLinkOption}
          {zeldaOption}
        </select>

        {colorForm}

        {deleteThisMainFormButton}
      </>
    );
  }
}

ChangeMainsInput.propTypes = {
  currentCharacters: PropTypes.array,
  currentCharacterIndex: PropTypes.number,
  handleCharacterChange: PropTypes.func,
  handleDeleteMainInput: PropTypes.func,
};
