const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./database/database');
const Perguntas = require('./models/Perguntas');
const Respostas = require('./models/Respostas');

const app = express();

conn
  .authenticate()
  .then(() => console.log("Conexão com DB ok!"))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Perguntas
    .findAll({ 
      raw: true, 
      order: [['id', 'DESC']] 
    })
    .then(perguntas => {
      res.render('index', { perguntas });
    })
    .catch((err) => console.log(err));;
});

app.get('/perguntar', (req, res) => res.render('perguntar'));

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id;

  Perguntas
    .findOne({ where: { id } })
    .then(pergunta => {
      if (pergunta != undefined) {
        Respostas
          .findAll({ 
            where: { pergunta_id: id },
            order: [['id', 'DESC']]
          })
          .then(respostas => res.render('pergunta', { pergunta, respostas }))
      } else {
        res.redirect('/');
      }
    });

});

app.post('/salvar_pergunta', (req, res) => {
  const titulo = req.body.titulo;
  const pergunta = req.body.pergunta;

  Perguntas.create({
    titulo,
    pergunta
  }).then(() => res.redirect('/'));
});

app.post('/salvar_resposta', (req, res) => {
  const corpo = req.body.corpo;
  const pergunta_id = req.body.pergunta_id;

  Respostas.create({
    corpo,
    pergunta_id
  }).then(() => res.redirect(`/pergunta/${pergunta_id}`));
})

app.listen(3333, err => {
  if (err) {
    console.log('Erro: ' + err);
  } else {
    console.log('Servidor iniciado com sucesso!');
  }
})