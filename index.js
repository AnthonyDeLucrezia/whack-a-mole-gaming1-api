const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors({
    origin: '*'
}));

const players = [];

for (let cpt = 0; cpt < 10; cpt++) {
    players.push({
      id: `${cpt}`,
      name: `player-${cpt}`,
      score: 15 * cpt + 1,
    });
  }


app.get('/leaderboard', (req,res) => {
    res.status(200).json(players)
})

app.listen(8080, () => {
    console.log("Server is running...");   
  })