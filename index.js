const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
app.use(express.json());

const players = [];

for (let cpt = 0; cpt < 10; cpt++) {
    players.push({
      id: `${cpt}`,
      name: `player-${cpt}`,
      score: 15 * cpt + 1,
    });
  }

const sortPlayer = (player1, player2) => {
    if (player1.score > player2.score) {
        return -1;
    }
  
    if (player1.score < player2.score) {
        return 1;
    }
  
    return 0;
  }
  

app.post('/api/players', function (req, res) {
    const newPlayer = req.body.player;
    const today = new Date();
    const currentPlayer = {
      id: `${newPlayer.name}-${newPlayer.score}-${today.getTime()}`,
      name: newPlayer.name,
      score: newPlayer.score,
    };
    players.push(currentPlayer);
    const sortedPlayers = players.sort(sortPlayer);
    return res.status(200).json(sortedPlayers.slice(0,10));
});

app.get('/api/leaderboard', (req,res) => {
    const sortedPlayers = players.sort(sortPlayer);
    res.status(200).json(sortedPlayers.slice(0,10))
})

app.listen(8080, () => {
    console.log("Server is running...");   
  })