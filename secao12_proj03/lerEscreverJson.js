const fs = require("fs");

fs.readFile('./json.json', {encoding: 'utf-8'}, (err, textData) => {
  if (err) {
    console.log("Erro ao ler arquivo: " . err);
  } else {
    const jsonData = JSON.parse(textData);

    console.log(jsonData);
    
    jsonData.nome = "Laíssi Vedovato";
    jsonData.area = "Inteligência Artificial";

    console.log(jsonData);

    fs.writeFile('./json.json', JSON.stringify(jsonData), (err) => {
      console.log("Erro ao salvar arquivo: " . err);
    })
  }
})