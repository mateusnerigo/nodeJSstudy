//calbacks

const enviarEmail = (corpo, para, callback) => {
  setTimeout(() => {
    console.log(`
      Para: ${para}
      ----------------------------------
      ${corpo}
      ----------------------------------
      De: Mateus Neri
    `)

    callback(
      'OK',
      'Mateus',
      '8s',
    );
  }, 8000);
};

console.log("Início do envio do email...");
enviarEmail(
  "Olá, cidadão! Bem vindo!!",
  'mateuslimaneri@gmail.com', 
  (status, name, time)  => { 
    console.log(`
    Status do envio: ${status}
    Remetente: ${name}
    Tempo decorrido: ${time}
    `);
  }
);

console.log('----------------------------------');
