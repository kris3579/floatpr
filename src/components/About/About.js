import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <div className='aboutDiv'>
          <h2>About FloatPR</h2>
          <p>
            FloatPR is a database created for looking at statistics in the Western Washington
            Super Smash Bros. Melee community. I created it to flesh out my new skills as a
            full-stack software developer and to keep tabs on the local Melee community because
            I find local statistics more interesting than on a national scale. It could also
            function as a relativly accurate resource for players to compare themselves against
            other competitors in the state, a historical record of performance, as well as a
            guideline for any TO&apos;s to use for seeding their brackets. Credit to Micheal 
            Hartley and Mitch Dzugan for creating HartPR, the spiritual predecesor to FloatPR, 
            and a large inspiration for me getting into code in the first place!
          </p>
        </div>

        <div className='aboutDiv'>
          <h3>How It Works</h3>
          <p>
            FloatPR uses an <a href='https://github.com/ReedD/glicko-two'>implementation</a> of
            the Glicko-2 formula created by Mark Glickman to rank players. A Player must have
            attended at least five brackets to appear on the ranking. A player must have attended
            at least four brackets in the past 2 months to be considered &apos;active&apos; Any
            bracket in Washington with at least 8 attendees may be added. I will update the
            database with relevant tournaments from Challonge and SmashGG on a weekly basis.
          </p>
        </div>

        <div className='aboutDiv'>
          <h3>Making Requests</h3>
          <p>
            On the requests page you may make a number of requests to add to/edit the database
            including:<br/>
            <br/>
            -Request to change your tag<br/>
            -Request to add or change a sponser on your player profile<br/>
            -Request to change the mains on your player profile 
            (including changing your main&apos;s color)<br/>
            -Request to change the home state/region on your player profile<br/>
            -Request to merge the results of one tag into another<br/>
            -Request to use the results from a recent unaccounted for tournament<br/>
            <br/>
            Requests will be taken care of by my discretion along with adding any new tournaments
            on a weekly basis.
          </p>
        </div>

        <div className='aboutDiv'>
          <h3>Actively Added Tournament Series</h3>
          <ul>
            <a href='https://tsns.challonge.com/tournaments'>That&apos;s Not Safe</a><br/>
            <a href='https://challonge.com/users/uwsmash/tournaments'>UW Smash</a><br/>
            <a href='https://challonge.com/users/seattleusmash/tournaments'>Smash @ SU</a><br/>
            <a href='https://challonge.com/users/eastsidesmash/tournaments'>East Side Smash</a><br/>
            <a href='https://epeengaming.challonge.com/tournaments'>EPG</a><br/>
            <a href='https://challonge.com/users/kneeil/tournaments'>Bangers and Smash</a><br/>
            <a href='https://challonge.com/users/bozionjr/tournaments'>The Smash House</a><br/>
            <a href='https://joy.challonge.com/tournaments'>Randall&apos;s Paradise</a>
          </ul>
        </div>
        
        <div className='aboutDiv'>
          <p>
            <strong>Contact</strong><br/>
            Kristianesvelt@hotmail.com<br/>
            <br/>
            <strong>FloatPR Github Repos</strong><br/>
            <strong><a href='https://github.com/kris3579/floatpr'>Front-End</a></strong><br/>
            <strong><a href='https://github.com/kris3579/floatpr-backend'>Back-End</a></strong>
          </p>
        </div>
      </div>

    );
  }
}
