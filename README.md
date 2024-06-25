## Pré requisitos
- Instalar o Node JS
- Instalar o MySQL
- Extrair o arquivo compactado, após abrir o projeto no Visual Studio Code, entrar no arquivo database.js e definir os dados do banco de acordo com o seu banco de dados.
- Iniciar o MySQL e usar os seguintes comandos:

create database filmes;

use filmes;

CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE filme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ano_lancamento YEAR,
    id_categoria INT,
    imagem LONGBLOB,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);

- No terminal do VS Code digitar o comando 'node server/app.js' para iniciar o servidor 
- Em um navegador copie e cole essa URL localhost:3000/index


## Instruções do funcionamento do site

1. A página inical exibe os filmes adicionados por categorias. O filme pode ser aberto para visualizar seus detalhas, basta clicar no filme desejado.

2. O menu "Cadastro" na barra de navegação abre mais duas ações: "Cadastro de Categoria" e "Cadastro de Filme". O menu "Início" volta para a página inical.

3. "Cadastro de Categoria" é possível adiconar uma categoria ao site, abaixo aparece as categorias cadastradas, onde é possível editar a categoria ou excluir.

4. "Cadastro de Filme" é possível adicionar o título do filme, descrição, ano e a imagem, abaixo do cadastro exibe os filmes prontos com duas opções, uma para editar e uma para excluir o filme.