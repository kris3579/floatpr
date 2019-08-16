import React from 'react';

import './About.scss';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h3>About FloatPR</h3>
        <p>FloatPR is a ranking created for the Western Washington Super Smash Bros. Melee community. I created it as a way to keep tabs on the Washington Melee community because I find following the local scene more interesting than the top level. It could also function relativly accurate resource for players to compare themselves against other competitors in the state, as well as a guideline for any TO's to use for seeding their brackets. Credit to M Hartley for creating HartPR, the spiritual predecesor to FloatPR, and an app I spent a lot of time browsing.</p>

        <h4>How It Works</h4>
        <p>FloatPR uses the Glicko-2 formula created by Mark Glickman to rank players. Any bracket in Washington with at least 8 attendees may be added.</p>

        <h4>Making Requests</h4>
        <p>You may make a number of requests on the request page including:</p>
        <p>
          - Requesting to add or replace the mains of your player profile (including changing your main's color)<br/>
          - Requesting to change the home state of your player profile<br/>
          - Requesting to combine the results of two players into one<br/>
          - Requesting to use the results from an recent unaccounted for tournament
        </p>
        <p>Requests will be taken care of along with adding any new tournaments on Sunday's</p>

        <h4>Actively Added Tournaments</h4>
        <p>
          - UW weekly<br/>
          - SU weekly<br/>
          - TNS<br/>
          - Bangers and Smash<br/>
          - EPG<br/>
          - Olympia?<br/>
          - Bellingham?
        </p>

        <p>
          <span>Github Profile</span><br/>
          <span><a className='aboutLink' href='https://github.com/kris3579'>Github</a></span><br/>
          <br/>
          <span>FloatPR Github Repos</span><br/>
          <span><a className='aboutLink' href='https://github.com/kris3579/floatpr'>Front-End</a></span>
        </p>
      </div>

    );
  };
};