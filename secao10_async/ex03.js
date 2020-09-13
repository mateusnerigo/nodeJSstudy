const getUsers = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([
      { name: "Mateus", lang: "JS" },
      { name: "Laíssi", lang: "HTML" },
      { name: "Maria", lang: "PHP" }
    ]);
  }, 3000)
});

async function principal() {
  const users = await getUsers();
  console.log(users);
}

principal();

// getUser().then(users => console.log(users));