class Dado
{
  constructor(lados) {
    this.lados = lados;
  }

  // Rolar() {
  //   console.log(Math.floor(Math.random() * (this.lados - 1 + 1)) + 1);
  // }

  Rolar() {
    console.log(Math.floor(Math.random() * this.lados) + 1);
  }
}

const d6 = new Dado(6);
const d10 = new Dado(10);

d6.Rolar();
d10.Rolar();

