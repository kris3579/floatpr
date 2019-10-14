import React from 'react';
import PropTypes from 'prop-types';

import characterColors from '../../../assets/characterColors';

export default class ChangeMainsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      mains: ['main1'],
      main1: {
        character: '',
        color: '',
      },
      main2: {
        character: '',
        color: '',
      },
      main3: {
        character: '',
        color: '',
      },
    };
  }

  handleChange = (event, main) => {
    event.preventDefault();
    const { name, value } = event.target;

    const previousObject = { ...this.state[main] };
    previousObject[name] = value;

    this.setState({
      [main]: previousObject,
    });
  };

  handleAnotherMainForm = () => {
    if (this.state.mains.includes('main1') === false) {
      return this.setState({
        mains: ['main1', ...this.state.mains],
      });
    }

    if (this.state.mains.includes('main2') === false) {
      if (this.state.mains.includes('main3')) {
        return this.setState({
          mains: ['main1', 'main2', 'main3'],
        });
      }

      return this.setState({
        mains: ['main1', 'main2'],
      });
    }

    return this.setState({
      mains: ['main1', 'main2', 'main3'],
    });
  }

  handleHandleDeleteMainForm = (main) => {
    switch (main) {
      case 'main1':
        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main2', 'main3'])) {
          this.setState({
            main1: {
              character: '',
              color: '',
            },
            mains: ['main2', 'main3'],
          });
        }

        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main2'])) {
          this.setState({
            main1: {
              character: '',
              color: '',
            },
            mains: ['main2'],
          });
        }

        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main3'])) {
          this.setState({
            main1: {
              character: '',
              color: '',
            },
            mains: ['main3'],
          });
        }
        break;

      case 'main2':
        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main2', 'main3'])) {
          this.setState({
            main2: {
              character: '',
              color: '',
            },
            mains: ['main1', 'main3'],
          });
        }

        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main2'])) {
          this.setState({
            main2: {
              character: '',
              color: '',
            },
            mains: ['main1'],
          });
        }

        if (JSON.stringify(this.state.mains) === JSON.stringify(['main2', 'main3'])) {
          this.setState({
            main2: {
              character: '',
              color: '',
            },
            mains: ['main3'],
          });
        }

        break;

      case 'main3':
        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main2', 'main3'])) {
          this.setState({
            main3: {
              character: '',
              color: '',
            },
            mains: ['main1', 'main2'],
          });
        }
        if (JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main3'])) {
          this.setState({
            main3: {
              character: '',
              color: '',
            },
            mains: ['main1'],
          });
        }
        if (JSON.stringify(this.state.mains) === JSON.stringify(['main2', 'main3'])) {
          this.setState({
            main3: {
              character: '',
              color: '',
            },
            mains: ['main2'],
          });
        }
        break;

      default:
        break;
    }
  }
  
  handleSubmitRequest = (event) => {
    event.preventDefault();
    const { state } = this;
    
    this.props.handleChangeMains(state.user, state.main1, state.main2, state.main3);
  };
  
  createColorForm = (character, main) => {
    return <select name='color' value={this.state[main].color} onChange={(event) => this.handleChange(event, main)} className='formSelect' required>
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
    const addAnotherMainButton = JSON.stringify(this.state.mains) === JSON.stringify(['main1', 'main2', 'main3']) ? null
      : <button type='button' onClick={this.handleAnotherMainForm}>Add Another Main</button>;

    return (
      <div>
        <h3>Add to or Replace your mains, Enter New Main and Color</h3>

        <form onSubmit={this.handleSubmitRequest}>
          {addAnotherMainButton}
          <input type='text' placeholder='Your Tag' name='user' onChange={(event) => this.props.handleChange(event, this)} required/>
          
          {
            this.state.mains.map((main, i) => {
              const main1Char = this.state.main1.character;
              const main2Char = this.state.main2.character;
              const main3Char = this.state.main3.character;
              const currentCharaters = [main1Char, main2Char, main3Char];

              const bowserOption = currentCharaters.includes('bowser') ? <option value='bowser' disabled>Bowser</option> : <option value='bowser'>Bowser</option>;
              const captainFalconOption = currentCharaters.includes('captainFalcon') ? <option value='captainFalcon' disabled>Captain Falcon</option> : <option value='captainFalcon'>Captain Falcon</option>;
              const doctorMarioOption = currentCharaters.includes('doctorMario') ? <option value='doctorMario' disabled>Doctor Mario</option> : <option value='doctorMario'>Doctor Mario</option>;
              const donkeyKongOption = currentCharaters.includes('donkeyKong') ? <option value='donkeyKong' disabled>Donkey Kong</option> : <option value='donkeyKong'>Donkey Kong</option>;
              const falcoOption = currentCharaters.includes('falco') ? <option value='falco' disabled>Falco</option> : <option value='falco'>Falco</option>;
              const foxOption = currentCharaters.includes('fox') ? <option value='fox' disabled>Fox</option> : <option value='fox'>Fox</option>;
              const gameAndWatchOption = currentCharaters.includes('gameAndWatch') ? <option value='gameAndWatch' disabled>Game & Watch</option> : <option value='gameAndWatch'>Game & Watch</option>;
              const ganondorfOption = currentCharaters.includes('ganondorf') ? <option value='ganondorf' disabled>Ganondorf</option> : <option value='ganondorf'>Ganondorf</option>;
              const iceClimbersOption = currentCharaters.includes('iceClimbers') ? <option value='iceClimbers' disabled>Ice Climbers</option> : <option value='iceClimbers'>Ice Climbers</option>;
              const jigglypuffOption = currentCharaters.includes('jigglypuff') ? <option value='jigglypuff' disabled>Jigglypuff</option> : <option value='jigglypuff'>Jigglypuff</option>;
              const kirbyOption = currentCharaters.includes('kirby') ? <option value='kirby' disabled>Kirby</option> : <option value='kirby'>Kirby</option>;
              const linkOption = currentCharaters.includes('link') ? <option value='link' disabled>Link</option> : <option value='link'>Link</option>;
              const luigiOption = currentCharaters.includes('luigi') ? <option value='luigi' disabled>Luigi</option> : <option value='luigi'>Luigi</option>;
              const marioOption = currentCharaters.includes('mario') ? <option value='mario' disabled>Mario</option> : <option value='mario'>Mario</option>;
              const marthOption = currentCharaters.includes('marth') ? <option value='marth' disabled>Marth</option> : <option value='marth'>Marth</option>;
              const mewtwoOption = currentCharaters.includes('mewtwo') ? <option value='mewtwo' disabled>Mewtwo</option> : <option value='mewtwo'>Mewtwo</option>;
              const nessOption = currentCharaters.includes('ness') ? <option value='ness' disabled>Ness</option> : <option value='ness'>Ness</option>;
              const peachOption = currentCharaters.includes('peach') ? <option value='peach' disabled>PPeach</option> : <option value='peach'>Peach</option>;
              const pichuOption = currentCharaters.includes('pichu') ? <option value='pichu' disabled>Pichu</option> : <option value='pichu'>Pichu</option>;
              const pikachuOption = currentCharaters.includes('pikachu') ? <option value='pikachu' disabled>Pikachu</option> : <option value='pikachu'>Pikachu</option>;
              const royOption = currentCharaters.includes('roy') ? <option value='roy' disabled>Roy</option> : <option value='roy'>Roy</option>;
              const samusOption = currentCharaters.includes('samus') ? <option value='samus' disabled>Samus</option> : <option value='samus'>Samus</option>;
              const sheikOption = currentCharaters.includes('sheik') ? <option value='sheik' disabled>Sheik</option> : <option value='sheik'>Sheik</option>;
              const yoshiOption = currentCharaters.includes('yoshi') ? <option value='yoshi' disabled>Yoshi</option> : <option value='yoshi'>Yoshi</option>;
              const youngLinkOption = currentCharaters.includes('youngLink') ? <option value='youngLink' disabled>Young Link</option> : <option value='youngLink'>Young Link</option>;
              const zeldaOption = currentCharaters.includes('zelda') ? <option value='zelda' disabled>Zelda</option> : <option value='zelda'>Zelda</option>;

              const colorForm = this.state[main].character === '' ? null : this.createColorForm(this.state[main].character, main);
              const deleteThisMainFormButton = JSON.stringify(this.state.mains) === JSON.stringify(['main1']) ? null
                : <img className='removeImgRequest' src={require('../../../assets/delete.png')} onClick={() => this.handleHandleDeleteMainForm(main)} alt='Red X'/>;

              return (
                <div key={i}>

                  <select name='character' value={this.state[main].character} onChange={(event) => this.handleChange(event, main)} className='formSelect' required>
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
                </div>
              );
            })
          }
          <button type='submit' className='requestButton'>Submit</button>
        </form>

      </div>
    );
  }
}

ChangeMainsForm.propTypes = {
  handleChangeMains: PropTypes.func,
  handleChange: PropTypes.func,
};
