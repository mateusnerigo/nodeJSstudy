class Leitor
{
  Ler(caminho) 
  {
    return ("Conteúdo do Arquivo");
  }
}

class Escritor
{
  Escrever(arquivo, conteudo)  
  {
    console.log("Conteúdo Escrito");
  }
}

class Criador
{
  Criar(nome)
  {
    console.log("Arquivo Criado");
  }
}

class Deletor 
{
  Deletar(nome)
  {
    console.log("Deletando Arquivo");
  }
}

class ManipuladorDeArquivos
{
  constructor(nome) 
  {
    this.arquivo = nome;
    this.leitor = new Leitor();
    this.escritor = new Escritor();
    this.criador = new Criador();
    this.deletor = new Deletor();
  }
}

const manipulador = new ManipuladorDeArquivos("arquivo.txt");

manipulador.leitor.Ler();
manipulador.escritor.Escrever();
// ...