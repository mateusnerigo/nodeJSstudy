const express = require('express');
const router = express.Router();

const Category = require('./Category');
const slugify = require('slugify');

router.get('/admin/categories', (req,res) => {
  Category
    .findAll()
    .then(categories => {
      res.render('admin/categories/categories', { categories });
    })
    .catch(err => {
      console.log(`Erro ao carregar categorias: ${err}`);
    })
});

router.get('/admin/categories/new', (req, res) => {
 res.render('admin/categories/newCategory');
});

router.get('/admin/categories/edit/:id', (req, res) => {
  const id = req.params.id;

  Category
    .findByPk(id)
    .then(category => {
      if(category != undefined) {
        res.render('admin/categories/editCategory', { category });
      }
      else {
        res.redirect('/admin/categories');
      }
    })
    .catch(err => {
      console.log(`Erro ao editar categoria: ${err}`);
      setInterval(
        (() => res.redirect('/admin/categories')), 
        2000);
    })
    ;
});

router.post('/admin/categories/save', (req, res) => {
  const categoryTitle = req.body.categoryTitle;
  console.log(categoryTitle);
  if (categoryTitle != undefined || categoryTitle != "") {
    Category.create({
      title: categoryTitle,
      slug: slugify(categoryTitle.toLowerCase()),
    })
    .then(() => {
      res.redirect("/admin/categories");
    })
    .catch((err) => {
      console.log(`Erro ao salvar categoria: ${err}`);
    });
  } else {
    res.redirect("/admin/categories/new");
  }

});

router.post('/admin/categories/delete', (req, res) => {
  const categoryId = req.body.categoryId;

  if (categoryId != undefined || !isNaN(categoryId)) {
    Category
      .destroy({
        where: { id: categoryId }
      })
      .then(() => {
        res.redirect('/admin/categories');
      })
      .catch(err => {
        console.log(`Erro ao deletar categoria: ${err}`);
      }) ;
  } 
  else {
    res.redirect('/admin/categories');
  }
  
});

router.post('/admin/categories/update', (req, res) => {
  const categoryId = req.body.categoryId;
  const categoryTitle = req.body.categoryTitle;
  
  Category
    .update({ 
        title: categoryTitle,
        slug: slugify(categoryTitle).toLowerCase()
      },
      { where: { id: categoryId } }
    )
    .then(() => {
      res.redirect('/admin/categories');
    })
    .catch(err => {
      console.log(`Erro ao atualizar categoria: ${err}`);
    })
})

module.exports = router;