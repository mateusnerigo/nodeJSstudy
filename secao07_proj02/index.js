const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./src/categories/CategoriesController');
const articlesController = require('./src/articles/ArticlesController');
const usersController = require('./src/users/UserController');

const Category = require('./src/categories/Category');
const Article = require('./src/articles/Article');
const User = require('./src/users/User');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
  .authenticate()
  .then(() => {
    console.log('Conexão com DB ok!');
  })
  .catch(err => {
    console.log('Erro de conexão com DB: ' + err);
  });


app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', usersController);

app.get('/', (req, res) => {
  Article
    .findAll({ 
      order: [ 
        ['id', 'DESC'] 
      ],
      limit: 5 
    })
    .then(articles => {
      Category 
        .findAll()
        .then(categories => {
          res.render('index', { 
            articles, 
            categories 
          });
        })

    })
});

app.get('/:slug', (req, res) => {
  const slug = req.params.slug;

  Article
    .findOne({ where: { slug } })
    .then(article => {
      if (article != undefined) {
        Category    
          .findAll()
          .then(categories => {
            res.render('article', { 
              article,
              categories 
            });
          })

      } 
      else {
        res.redirect('/');
      }
    })
    .catch(err => {
      console.log(`Erro ao carregar artigo: ${err}`);
    })
});

app.get('/category/:slug', (req, res) => {
  const slug = req.params.slug;

  Category 
    .findOne({ 
      where: { slug },
      include: [ { model: Article } ]
    })
    .then(category => {
      if (category != undefined) {
        Category
          .findAll()
          .then(categories => {
            res.render("index", {
              articles: category.articles,
              categories
            });
          });
      }
      else {
        res.redirect('/');
      }
    })
    .catch(err => {
      console.log(`Erro ao carregar artigos por categoria: ${err}`);
    })
}) 

app.listen(3333, err => {
  const onListen = err ? `Erro de servidor: ${err}` : 'Sucesso ao iniciar servidor. Porta 3333';

  console.log(onListen);
});