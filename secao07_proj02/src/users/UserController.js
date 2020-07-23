const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./User');

const adminAuth = require('../../middlewares/authentication');

const router = express.Router();

router.get('/admin/users', adminAuth, (req, res) => {
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

router.get('/admin/users/new', adminAuth, (req, res) => {
  res.render('admin/users/newUser');
})

router.post('/admin/users/save', adminAuth, (req, res) => {
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

router.get('/login', (req, res) => {
  res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User
    .findOne({
      where: { email }
    })
    .then(user => {
      if(user != undefined) {
        const correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          req.session.user = {
            id: user.id,
            email: user.email
          }
          res.redirect('/admin/articles');
        } 
        else {
          console.log('Senha incorreta!');
          res.redirect('/login');
        }
      }
      else {
        console.log('Nenhum usuário com este email');
        res.redirect('/login');
      }
    })
    .catch(err => {
      console.log(`Erro ao localizar usuário: ${err}`);
      res.redirect('/login');
    })
});

router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
})

module.exports = router;