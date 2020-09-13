class Filme 
{
  constructor(titulo, ano, genero, diretor, duracao) 
  {
    this.titulo = titulo;
    this.ano = ano;
    this.genero = genero;
    this.diretor = diretor;
    this.atores = [];
    this.duracao = duracao;
  }

  Reproduzir() 
  {
    console.log("Reproduzindo...");
  }

  Pausar() 
  {
    console.log("Pausando...");
  }

  Avancar() 
  {
    console.log("Avançando...");
  }

  Fechar() 
  {
    console.log("Fechando...");
  }

  ImprimeFicha()
  {
    console.log(this.titulo, this.ano, this.genero, this.diretor, this.duracao);
  }
}

const vingadores = new Filme(
  "Vingadores",
  2015,
  "Ação",
  "Alguem Borgusversk",
  120
);

vingadores.ImprimeFicha();