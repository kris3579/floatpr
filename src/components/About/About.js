import React from 'react';

import './About.scss';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h3>About FloatPR</h3>
        <p>FloatPR is a ranking created for the Western Washington Super Smash Bros. Melee community. I created it as a way to keep tabs on the Washington Melee community because I find following the local scene much more interesting to follow than the top level of Melee. It could also function relativly accurate resource for players to compare themselves against other competitors in the state, as well as a guideline for any TO's to use for seeding their brackets. Credit to M Hartley for creating HartPR, the spiritual predecesor to FloatPR, and a website I spent a lot of time browsing.</p>

        <h4>How It Works</h4>
        <p>FloatPR uses the Glicko-2 formula created by Mark Glickman to rank players. Any bracket in Washington may be added as long as it uses double elimination format. Other formats will not be accepted due to the large amount of sets played by individual players in round robins and swiss brackets.</p>

        <h4>Making Requests</h4>
        <p>You may make a number of requests on the request page including:</p>
        <p>
          - Requesting to add or replace mains to your player profile (including changing your color)<br/>
          - Requesting to combine the results of two players into one<br/>
          - Requesting to use the results from an recent unaccounted for tournament
        </p>

        <h4>Actively Added Tournaments</h4>
        <p>
          - UW weekly<br/>
          - SU weekly<br/>
          - TNS<br/>
          - Bangers and Smash?<br/>
          - EPG?<br/>
          - Olympia?<br/>
          - Bellingham?
        </p>

        <p>
          <span>Github Profile</span><br/>
          <span><a className='aboutLink' href='https://github.com/kris3579'>Github</a></span><br/>
          <br/>
          <span>FloatPR Github Repos</span><br/>
          <span><a className='aboutLink' href='https://github.com/kris3579/floatpr'>Front-End</a></span><br/>
          <span><a className='aboutLink' href='https://github.com/kris3579/floatpr-backend'>Back-End</a></span>
        </p>
      </div>

    );
  };
};