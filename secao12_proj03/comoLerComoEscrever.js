const fs = require("fs");

//ler
fs.readFile("./texto.txt", { encoding: 'utf-8' }, (err, textData) => {
  if (err) {
    console.log("Erro na leitura do arquivo! " . err);
  } else {
    console.log(textData);
  }
});


//escrever
fs.writeFile("./texto.txt", "Sobrescrito?", (err) => {
  if (err) {
    console.log(err);
  }
})