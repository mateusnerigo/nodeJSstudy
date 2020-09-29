const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();
const jwtSecret = "yuyg19goev197v189gr71vr8b1";

app.use(cors());
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
  ],
  users: [
    { id: 1, name: "Mateus Neri", email: "mateus@a.com", password: "mateus123" },
    { id: 2, name: "Laíssi Vedovato", email: "laissi@a.com", password: "laissi123" },
  ]
}

function auth(req, res, next) {
  const authToken = req.headers['authorization'];
  
  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];

    jwt.verify(token, jwtSecret, (err, tokenData) => {
      if (err) {
        res.status(401),
        res.json({ err: "Token Inválido"});
      } else {
        res.token = token;
        req.loggedUser = { 
          id: tokenData.id, 
          email: tokenData.email
        }
        
        next();
      }
    });
    
  } else {
    res.status(401);
    res.json({ err: "Token Inválido." });
  }
}

app.get('/games', auth, (req, res) => {
  res.statusCode = 200;
  res.json({ 
    user: req.loggedUser, 
    games: database.games 
  });
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

app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (email != undefined) {
    const user = database.users.find(u => u.email == email);

    if (user != undefined) {
      if (user.password == password) {
        jwt.sign(
          { id: user.id, email: user.email }, 
          jwtSecret, 
          { expiresIn: '1h' },
          (err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token: token });
            }
          }
        );
      } else {
        res.status(401);
        res.json({ err: "Informações não batem." });
      }
    } else {
      res.status(400);
      res.json({ err: "Email não existe na base de dados." });
    }
  } else {
    res.status(400);
    res.json({ err: "Email inválido." })
  }
})

app.listen(3333, () => {
  console.log('Sucesso na inicialização!');
})