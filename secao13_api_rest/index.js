const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const database = {
  games: [
    { id: 1,  title: "Warframe", year: 2013, price: 0  },
    { id: 2, title: "PokeMMO", year: 2013, price: 0 },
    { id: 3, title: "Ark Survival Evolved", year: 2015, price: 95 },
    { id: 4, title: "Minecraft", year: 2010, price: 185 },
    { id: 5, title: "Perfect World", year: 2005, price: 0 },
    { id: 6, title: "Forza Horizon 4", year: 2018, price: 150 },
  ]
}

app.get('/games', (req, res) => {
  res.statusCode = 200;
  res.json(database.games);
})

app.get('/game/:id', (req, res) => {
  const id = req.params.id;

  if (!isNaN(id)) {
    const parsedId = parseInt(id); 
    const game = database.games.find(g => g.id == parsedId);

    if(game != undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
})

app.post('/game', (req, res) => {
  const { title, price, year } = req.body;

  database.games.push({
    id: database.games.length + 1,
    title,
    price,
    year
  });

  res.sendStatus(200);
})

app.put('/game/:id', (req, res) => {
  const id = req.params.id;

  if(!isNaN(id)) {
    const parsedId = parseInt(id);
    const game = database.games.find(g => g.id == parsedId);

    if (game != undefined) {
      const { title, price, year } = req.body;

      if (title != undefined) {
        game.title = title;
      }

      if (price != undefined) {
        game.price = price;
      }

      if (year != undefined) {
        game.year = year;
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
})

app.delete('/game/:id', (req, res) => {
  const id = req.params.id;

  if (!isNaN(id)) {
    const parsedId = parseInt(id);
    const gameIndex = database.games.findIndex(g => g.id == parsedId);

    if (gameIndex == -1) {
      res.sendStatus(404);
    } else {
      database.games.splice(gameIndex, 1);
      res.sendStatus(200);
    }
  }
})

app.listen(3333, () => {
  console.log('Sucesso na inicialização!');
})