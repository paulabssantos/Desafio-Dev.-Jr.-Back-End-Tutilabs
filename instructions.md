# Instruções para rodar a aplicação

## Acessar o swagger
- localhost:PORTA/swagger

## Popular banco
### Ao rodar o comando abaixo, as tabelas de risco, status e níveis de acesso serão populadas. Bem como a tabela de usuários, que criará um usuário admin com a senha de login '1234' e email 'teste@teste.com'

- npm run seed

## Subir aplicação no docker
### Ao rodar o comando abaixo, serão criados dois containers no docker. Um para a aplicação e outro para o banco de dados. 

- npm run up

## Remover aplicação do docker os container serão removidos. 

- npm run down

## Rodar a aplicação em modo de desenvolvimento

- npm run start:dev