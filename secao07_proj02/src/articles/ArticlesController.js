const express = require('express');
const router = express.Router();
const slugify = require('slugify');

const Category = require('../categories/Category');
const Article = require('./Article');

router.get('/admin/articles', (req, res) => {
  Article
    .findAll({
      include: [{ model: Category }]
    })
    .then(articles => {
      res.render('admin/articles/articles', { articles });
    })
    .catch(err => {
      console.log(`Erro na exibição dos artigos: ${err}`);
    })
});

router.get('/admin/articles/new', (req, res) => {
  Category
    .findAll()
    .then(categories => {
      res.render('admin/articles/newArticle', { categories });
    })
});

router.get('/admin/articles/edit/:id', (req, res) => {
  const id = req.params.id;

  Article
    .findByPk(id) 
    .then(article => {
      if (article != undefined) {
        Category 
          .findAll()
          .then(categories => {
            res.render('admin/articles/editArticle', { 
              article, 
              categories 
            });
          })
      }
      else {
        res.redirect('/admin/articles');
      }
    })
    .catch(err => {
      console.log(`Erro ao abrir edição para o artigo: ${err}`);
      res.redirect('/admin/articles');
    })
})

router.post('/admin/articles/save', (req,res) => {
  const articleTitle = req.body.articleTitle || 'Artigo sem título';
  const articleCategory = req.body.articleCategory;
  const articleBody = req.body.articleBody || 'Artigo sem texto';

  Article
    .create({
      title: articleTitle,
      slug: slugify(articleTitle).toLowerCase(),
      body: articleBody,
      categoryId: articleCategory,
    })
    .then(() => {
      res.redirect('/admin/articles');
    })
    .catch(err => {
      console.log(`Erro ao salvar artigo: ${err}`);
    });
});


router.post('/admin/articles/delete', (req, res) => {
  const articleId = req.body.articleId;

  if (articleId != undefined || !isNaN(articleId)) {
    Article
      .destroy(       
        { where: { id: articleId } }
      )
      .then(() => {
        res.redirect('/admin/articles');
      })
      .catch(err => {
        console.log(`Erro ao excluir artigo: ${err}`);
      });
  }
  else {
    res.redirect('/admin/articles');
  }
});

router.post('/admin/articles/update', (req, res) => {
  const articleId = req.body.articleId;
  const articleTitle = req.body.articleTitle;
  const articleCategory = req.body.articleCategory;
  const articleBody = req.body.articleBody;

  Article
    .update(
      {
        title: articleTitle,
        slug: slugify(articleTitle).toLowerCase(),
        categoryId: articleCategory,
        body: articleBody
      },
      {
        where: { id: articleId }
      }
    )
    .then(() => {
      res.redirect('/admin/articles');
    })
    .catch(err => {
      console.log(`Erro ao atualizar artigo: ${err}`);
    });
});

router.get('/articles/page/:num', (req, res) => {
  const page = parseInt(req.params.num);
  const offset = (isNaN(page) || page == 1) ? 0 : page * 4;

  Article
    .findAndCountAll({
      limit: 5,
      offset,
      order: [
        ['id', 'DESC']
      ]
    })
    .then(articles => {
      const next = ( (offset + 4) >= articles.count ) ? false : true;

      const result = { 
        page,
        next, 
        articles 
      };

      Category 
        .findAll()
        .then(categories => {
          res.render('page', { 
            result,
            categories
          });
        })


    })
});

module.exports = router;