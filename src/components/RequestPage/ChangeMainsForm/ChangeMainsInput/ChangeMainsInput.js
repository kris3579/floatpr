import React from 'react';
import PropTypes from 'prop-types';

import characterColors from '../../../../assets/characterColors';

export default class ChangeMainsInput extends React.Component {
  createColorForm = (character) => {
    const { currentCharacters, currentCharacterIndex } = this.props;
    const currentColor = currentCharacters[currentCharacterIndex].color;

    return <select name='color' value={currentColor} onChange={(event) => this.props.handleCharacterChange(event, this.props.currentCharacterIndex, 'color')} className='formSelect' required>
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

    const bowserOption = currentCharacters.includes({ character: 'bowser' }) ? <option value='bowser' disabled>Bowser</option> : <option value='bowser'>Bowser</option>;
    const captainFalconOption = currentCharacters.includes({ character: 'captainFalcon' }) ? <option value='captainFalcon' disabled>Captain Falcon</option> : <option value='captainFalcon'>Captain Falcon</option>;
    const doctorMarioOption = currentCharacters.includes({ character: 'doctorMario' }) ? <option value='doctorMario' disabled>Doctor Mario</option> : <option value='doctorMario'>Doctor Mario</option>;
    const donkeyKongOption = currentCharacters.includes({ character: 'donkeyKong' }) ? <option value='donkeyKong' disabled>Donkey Kong</option> : <option value='donkeyKong'>Donkey Kong</option>;
    const falcoOption = currentCharacters.includes({ character: 'falco' }) ? <option value='falco' disabled>Falco</option> : <option value='falco'>Falco</option>;
    const foxOption = currentCharacters.includes({ character: 'fox' }) ? <option value='fox' disabled>Fox</option> : <option value='fox'>Fox</option>;
    const gameAndWatchOption = currentCharacters.includes({ character: 'gameAndWatch' }) ? <option value='gameAndWatch' disabled>Game & Watch</option> : <option value='gameAndWatch'>Game & Watch</option>;
    const ganondorfOption = currentCharacters.includes({ character: 'ganondorf' }) ? <option value='ganondorf' disabled>Ganondorf</option> : <option value='ganondorf'>Ganondorf</option>;
    const iceClimbersOption = currentCharacters.includes({ character: 'iceClimbers' }) ? <option value='iceClimbers' disabled>Ice Climbers</option> : <option value='iceClimbers'>Ice Climbers</option>;
    const jigglypuffOption = currentCharacters.includes({ character: 'jigglypuff' }) ? <option value='jigglypuff' disabled>Jigglypuff</option> : <option value='jigglypuff'>Jigglypuff</option>;
    const kirbyOption = currentCharacters.includes({ character: 'kirby' }) ? <option value='kirby' disabled>Kirby</option> : <option value='kirby'>Kirby</option>;
    const linkOption = currentCharacters.includes({ character: 'link' }) ? <option value='link' disabled>Link</option> : <option value='link'>Link</option>;
    const luigiOption = currentCharacters.includes({ character: 'luigi' }) ? <option value='luigi' disabled>Luigi</option> : <option value='luigi'>Luigi</option>;
    const marioOption = currentCharacters.includes({ character: 'mario' }) ? <option value='mario' disabled>Mario</option> : <option value='mario'>Mario</option>;
    const marthOption = currentCharacters.includes({ character: 'marth' }) ? <option value='marth' disabled>Marth</option> : <option value='marth'>Marth</option>;
    const mewtwoOption = currentCharacters.includes({ character: 'mewtwo' }) ? <option value='mewtwo' disabled>Mewtwo</option> : <option value='mewtwo'>Mewtwo</option>;
    const nessOption = currentCharacters.includes({ character: 'ness' }) ? <option value='ness' disabled>Ness</option> : <option value='ness'>Ness</option>;
    const peachOption = currentCharacters.includes({ character: 'peach' }) ? <option value='peach' disabled>PPeach</option> : <option value='peach'>Peach</option>;
    const pichuOption = currentCharacters.includes({ character: 'pichu' }) ? <option value='pichu' disabled>Pichu</option> : <option value='pichu'>Pichu</option>;
    const pikachuOption = currentCharacters.includes({ character: 'pikachu' }) ? <option value='pikachu' disabled>Pikachu</option> : <option value='pikachu'>Pikachu</option>;
    const royOption = currentCharacters.includes({ character: 'roy' }) ? <option value='roy' disabled>Roy</option> : <option value='roy'>Roy</option>;
    const samusOption = currentCharacters.includes({ character: 'samus' }) ? <option value='samus' disabled>Samus</option> : <option value='samus'>Samus</option>;
    const sheikOption = currentCharacters.includes({ character: 'sheik' }) ? <option value='sheik' disabled>Sheik</option> : <option value='sheik'>Sheik</option>;
    const yoshiOption = currentCharacters.includes({ character: 'yoshi' }) ? <option value='yoshi' disabled>Yoshi</option> : <option value='yoshi'>Yoshi</option>;
    const youngLinkOption = currentCharacters.includes({ character: 'youngLink' }) ? <option value='youngLink' disabled>Young Link</option> : <option value='youngLink'>Young Link</option>;
    const zeldaOption = currentCharacters.includes({ character: 'zelda' }) ? <option value='zelda' disabled>Zelda</option> : <option value='zelda'>Zelda</option>;

    const colorForm = currentCharacter === '' ? null : this.createColorForm(currentCharacter);
    const deleteThisMainFormButton = this.props.currentCharacters.length < 2 ? null
      : <img className='removeImgRequest' src={require('../../../../assets/delete.png')} onClick={() => this.props.handleDeleteMainInput(this.props.currentCharacterIndex)} alt='Red X'/>;
    
    return (
      <>
        <select name='character' value={currentCharacter} onChange={(event) => this.props.handleCharacterChange(event, this.props.currentCharacterIndex, 'character')} className='formSelect' required>
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
