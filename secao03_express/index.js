const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bem vindo ao site!");
});

app.get("/blog/:artigo?", (req, res) => {
  const artigo = req.params.artigo;

  if (artigo) {
    res.send("Artigo Disponível e Pronto para leitura: " + artigo);
  } else {
    res.send("Bem vindo ao blog!");
  }

});

app.get("/canal/", (req, res) => {
  const canal = req.query["canal"];

  if (canal)  {
    res.send("Bem vindo ao meu canal do Youtube: " + canal + "!");
  } else {
    res.send("Nenhum canal selecionado.");
  }
});

app.get("/ola/:nome/:empresa", (req, res) => {
  const nome = req.params.nome;
  const empresa = req.params.empresa;
  res.send(`<h1>Oi, ${nome}. Você trabalha na empresa: ${empresa}</h1>`);
});

app.listen(4000, err => {
  if (err) {
    console.log("Erro no servidor: " + err);
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});