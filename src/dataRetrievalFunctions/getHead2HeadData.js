const getHead2Head = (player1, player2, setsData) => {
  const head2HeadData = {
    player1SetScore: 0,
    player2SetScore: 0,
    player1GameScore: 0,
    player2GameScore: 0,
    setsPlayed: 0,
    setsPercentages: '',
    gamesPercentages: '',
  };

  setsData.forEach((set) => {
    if (set.winner_name === player1.name && set.loser_name === player2.name) {
      head2HeadData.player1SetScore += 1;
      head2HeadData.player1GameScore += set.winner_score;
      head2HeadData.player2GameScore += set.loser_score;
      head2HeadData.setsPlayed += 1;
    }
    if (set.winner_name === player2.name && set.loser_name === player1.name) {
      head2HeadData.player2SetScore += 1;
      head2HeadData.player2GameScore += set.winner_score;
      head2HeadData.player1GameScore += set.loser_score;
      head2HeadData.setsPlayed += 1;
    }
  });

  head2HeadData.setsPercentages = `${Math.round(((head2HeadData.player1SetScore / (head2HeadData.player1SetScore + head2HeadData.player2SetScore)) * 100) *100) / 100}-${Math.round(((head2HeadData.player2SetScore / (head2HeadData.player2SetScore + head2HeadData.player1SetScore)) * 100) * 100) / 100}`;
  head2HeadData.gamesPercentages = `${Math.round(((head2HeadData.player1GameScore / (head2HeadData.player1GameScore + head2HeadData.player2GameScore)) * 100) *100) / 100}-${Math.round(((head2HeadData.player2GameScore / (head2HeadData.player2GameScore + head2HeadData.player1GameScore)) * 100) * 100) / 100}`;

  return head2HeadData;
};

export default getHead2Head;

