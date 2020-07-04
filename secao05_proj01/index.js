const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const nome = "Mateus";
  const lang = "ECMAscript6";
  res.render("index", {
    nome,
    lang,
    empresa: "neriGo",
    idade: 25,
  });
});

app.listen(3333, err => {
  if (err) {
    console.log("Erro: " + err);
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
})