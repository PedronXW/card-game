# Car D Game

## Descrição

Aplicação desenvolvida em NodeJS, com o framework NextJS, que tem por objetivo simular um jogo de cartas com a temática de carros. Com ela duas pessoas podem jogar, a partir do mesmo dispositivo, e ver o histórico de partidas.
Os jogadores são identificados por `Player 1` e `Player 2` e por cores `Blue` e `Red` respectivamente e são utilizadas no histórico e na indicação do vencedor da partida e do round.

Dentro do histórico, partidas que acabaram com o Player 1 vencedor tem a borda Azul, partidas que acabaram com o Player 2 vencedor tem borda Vermelha e as que ainda não acabaram estão com borda branca.

## Descrição Técnica
- Para armazenamento dos dados utilizei o ORM Prisma conectado a um banco de dados Postgres.
- A estilização foi feita utilizando TailwindCSS, por conta da facil integração com o framework escolhido.
- O back-end da aplicação é disponibilizado também utilizando o Next e pode ser encontrado dentro da pasta `/src/app/api`, lá estão as chamadas para todos os controllers da aplicação, estes disponíveis dentro da pasta `back-end/infra/http/controllers`
- O back-end é inteiro contruído utilizando princípios de SOLID e Clean Archictecture, sendo organizada no seguinte fluxo `rota -> controller -> service -> repositório` utilizando Dependency Invertion, para que as unidades mais internas fiquem desacopladas das mais externas.
- A aplicação possui testes unitários utilizando o framework Jest e um repositório em memoria para verificar as funcionalidades, quando necessário.
- A estruturação é feita a partir de duas entidades `Round` e `Game`, a entidade Game agrupa seus rounds que são quem, de fato, controla todo o processo durante a partida.

## Executando a aplicação

Para executar a aplicação os seguintes comandos são disponibilizados:

### É necessário fazer a instalação de todas as dependencias antes de executar a aplicação, pode ser feito utilizando o comando `npm i` e adicionar as variáveis de ambiente em um arquivo `.env`

```bash
npm run dev
# Para executar a aplicação em estado de desenvolvimento
npm run build
# Para buildar a aplicação
npm run start
# Para executar a aplicação em Produção(é necessário executar o build antes de executar neste formato)
npm run test
# Para executar os testes da aplicação
```
