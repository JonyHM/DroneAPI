# API RESTful construída com Express, TypeORM e SQLite3

Para utilizar a API, siga os passos:

1. Execute `npm i` no terminal, acessando o diretório raiz do projeto.
2. Para mudanças no banco de dados, altere o arquivo `ormconfig.json`
3. `npm start` inicia a API para comunicação com o front-end.


## OBSERVAÇÕES

1. A API do **typeOrm** possui um método para criação de buffer que teve uma alteração no construtor, a partir da versão 10 do node. Por este motivo, e para dar continuidade com a utilização deste ORM, a solução foi utilizar a versão 9.9 do nodejs.

2. O acesso ao banco de dados criado na raiz da aplicação é realizado pelo comando `sqlite3 database.sqlite`. Entretanto, no windows, a instalação do sqlite3 **via npm** não disponibiliza o executável deste banco de dados no terminal. Para resolver isso, seu executável foi baixado no site oficial da equipe do SQLite e está na raiz do projeto, caso seja necessário verificar diretamente no banco seu conteúdo. 