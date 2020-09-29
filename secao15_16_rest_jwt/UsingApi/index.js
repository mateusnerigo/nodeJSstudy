const route = 'http://localhost:3333';
const token = localStorage.getItem('token') || '';

const axiosConfig = {
  headers: {
    authorization: `Bearer ${token}`,
  }
};

document.querySelector('button#createBtn').onclick = createGame;
document.querySelector('button#updateBtn').onclick = updateGame;
document.querySelector('button#loginBtn').onclick = login;
document.querySelector('button#logoutBtn').onclick = logout;

axios.get(`${route}/games`, axiosConfig)
  .then(request => {
    const games = request.data.games;
    const gamesList = document.querySelector('ul#games');

    games.forEach(game => {
      createGameItem(game, gamesList);
    });
  })  
  .catch(err => {
    console.log(`Erro ao acessar rota: ${err}`);
  });

function login()  {
  const emailInput = document.querySelector('input#email');
  const passwordInput = document.querySelector('input#password');

  const email = emailInput.value;
  const password = passwordInput.value;

  axios.post(`${route}/auth`, {
    email,
    password
  }).then(res => {
    const token = res.data.token;
    
    localStorage.setItem('token', token);
    
    axiosConfig.headers['authorization'] = `Bearer ${token}`;
    
    alert('Você está logado!');
   
    reloadPage();
  }).catch(err => {
    alert(`Login Incorreto: ${err}`);
  })
}

function logout() {
  localStorage.removeItem('token');

  alert('Você está deslogado!');

  reloadPage();
}

function createGame() {
  const titleInput = document.querySelector('input#title');
  const yearInput = document.querySelector('input#year');
  const priceInput = document.querySelector('input#price');

  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value
  }

   axios.post(`${route}/game`, game)
    .then(response => {
      if (response.status == 200) {
        alert('Novo item cadastrado!');
        
        titleInput.value = "";
        yearInput.value = "";
        priceInput.value = "";
        
        reloadPage();
      }
    })
    .catch(err => {
      console.log(`Erro ao criar novo item: ${err}`);
    });
}

function updateGame() {
  const idEdit = document.querySelector('input#idEdit');
  const titleEditInput = document.querySelector('input#titleEdit');
  const yearEditInput = document.querySelector('input#yearEdit');
  const priceEditInput = document.querySelector('input#priceEdit');

  const gameUpdate = {
    title: titleEditInput.value,
    year: yearEditInput.value,
    price: priceEditInput.value
  }

  axios.put(`${route}/game/${idEdit.value}`, gameUpdate)
    .then(response => {
      if (response.status == 200) {
        alert('Item atualizado!');

        titleEditInput.value = "";
        yearEditInput.value = "";
        priceEditInput.value = "";

        reloadPage();
      }
    })
    .catch(err => {
      console.log(`Erro ao atualizar item: ${err}`);
    });
}

function deleteGame(listItem) {
  const id = listItem.getAttribute('data-id');

  axios.delete(`${route}/game/${id}`)
    .then(response => {
      if (response.status == 200) {
        alert('Item excluido!');

        reloadPage();
      }
    })
    .catch(err => {
      console.log(`Erro ao deletar item: ${err}`);
    })
}

function createGameItem(game, gamesList) {
  const listItem = document.createElement('li');

  listItem.setAttribute('data-id', game.id);
  listItem.setAttribute('data-title', game.title);
  listItem.setAttribute('data-year', game.year);
  listItem.setAttribute('data-price', game.price);

  listItem.innerHTML = `${game.id} -> ${game.title}, ${game.year} - R$${game.price}`;

  const updateBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  updateBtn.innerHTML = 'Editar';
  updateBtn.onclick = () => loadToUpdate(listItem);

  deleteBtn.innerHTML = 'Excluir';
  deleteBtn.onclick = () => deleteGame(listItem);

  listItem.appendChild(updateBtn);
  listItem.appendChild(deleteBtn);
  gamesList.appendChild(listItem);
}

function loadToUpdate(listItem) {
  document.querySelector('input#idEdit').value = listItem.getAttribute('data-id');
  document.querySelector('input#titleEdit').value = listItem.getAttribute('data-title');
  document.querySelector('input#yearEdit').value = listItem.getAttribute('data-year');
  document.querySelector('input#priceEdit').value = listItem.getAttribute('data-price');
}

function reloadPage() {
  location.reload();
}