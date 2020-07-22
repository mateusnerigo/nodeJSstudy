const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {
  User
    .findAll()
    .then(users => {
      res.render('admin/users/users', { users });
    })
    .catch(err => {
      console.log(`Erro ao listar usuários: ${err}`);
      res.redirect('/');
    })
})

router.get('/admin/users/new', (req, res) => {
  res.render('admin/users/newUser');
})

router.post('/admin/users/save', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User
    .findOne({
      where: { email }
    })
    .then(user => {
      if (user == undefined) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
      
        User
          .create({
            email,
            password: hash
          })
          .then(() => {
            res.redirect('/admin/users');
          })
          .catch(err => {
            console.log(`Erro ao cadastrar novo usuário: ${err}`);
            res.redirect('/admin/users');
          });
      } else {
        res.redirect('/admin/users/create');
      }
    })

})

module.exports = router;