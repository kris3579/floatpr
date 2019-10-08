import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h2>About FloatPR</h2>
        <p>FloatPR is a database created for looking at statistics in the Western Washington Super Smash Bros. Melee community. I created it to flesh out my new skills as a full-stack software developer and to keep tabs on the local Melee community because I find local statistics more interesting than on a national scale. It could also function as a relativly accurate resource for players to compare themselves against other competitors in the state, as well as a guideline for any TO`&apos;`s to use for seeding their brackets. Credit to M Hartley for creating HartPR, the spiritual predecesor to FloatPR, and a large inspiration for me getting into code in the first place!</p>

        <h4>How It Works</h4>
        <p>FloatPR uses an <a href='https://github.com/ReedD/glicko-two'>implementation</a> of the Glicko-2 formula created by Mark Glickman to rank players. A Player must be from Washington, have attended at least five brackets total, and have attended at least two brackets in as many months to be considered `&apos;`active`&apos;` Any bracket in Washington with at least 8 attendees may be added. I will update the database with relevant tournaments from Challonge and SmashGG on a weekly basis.</p>

        <h4>Making Requests</h4>
        <p>On the requests page you may make a number of requests to add to/edit the database including:</p>
        <p>
          - Request to add or replace the mains of your player profile (including changing your main`&apos;`s color)<br/>
          - Request to change the home state/region of your player profile<br/>
          - Request to merge the results of one tag into another<br/>
          - Request to use the results from a recent unaccounted for tournament
        </p>
        <p>Requests will be taken care of by my discretion along with adding any new tournaments on a weekly basis. </p>

        <h4>Actively Added Tournament Series</h4>
        <p>
          - UW weekly<br/>
          - SU weekly<br/>
          - TNS<br/>
          - Bangers and Smash<br/>
          - EPG<br/>
          - Olympia<br/>
          - Bellingham
        </p>

        <p>
          <span>Github Profile</span><br/>
          <span><a href='https://github.com/kris3579'>Github</a></span><br/>
          <br/>
          <span>FloatPR Github Repos</span><br/>
          <span><a href='https://github.com/kris3579/floatpr'>Front-End</a></span><br/>
          <span><a href='https://github.com/kris3579/floatpr-backend'>Back-End</a></span>
        </p>
      </div>

    );
  }
}
