//promises 

const pegarId = () => {
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      resolve(5);
    }, 1500);
  });
};

const buscarEmailNoBanco = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("mateusneri@gmail.com");
    }, 2000);
  });
};

const enviarEmail = (corpo, para) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const erro = true;

      if (!erro) {
        console.log(erro);
        
        resolve({
          time: 6,
          to: 'mateuslineri@gmail.com'
        });
      } else {
        console.log(erro);
        
        reject("Erro = true");
      }
    }, 4000);
  });
};

// enviarEmail("Você é trouxa, cara!", "Mateus")
//   .then(( { time, to } ) =>  {
//     console.log('Promise resolve: ');
    
//     console.log(`
//       Time: ${time}
//       To: ${to}
//     `);
//   })
//   .catch(err => {
//     console.log('Promise reject ' + err);
//   });

// ---------------------------------------------------
// pegarId().then(id => {
//     buscarEmailNoBanco(id).then(email => {
//         enviarEmail("Você é trouxa, cara!", email).then(() => {
//           console.log('Email enviado com sucesso para: ' + id);
//         }).catch(() => {
//           console.log('Erro ao enviar email!');
//         })
//       })
//   })

async function principal() {
  const id = await pegarId();
  const email = await buscarEmailNoBanco(id);

  try {
    await enviarEmail("Você conseguiu", email);

    console.log(`
      Email enviado com sucesso para ${id}
      Time: ${envio.time}  
      To: ${envio.to}
    `);
  }
  catch (err) {
    console.log(`Erro ao enviar email: ${err}`);
  }
}

principal();