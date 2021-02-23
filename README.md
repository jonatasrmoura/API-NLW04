# Banco de dados -> Segundo dia


## Formas de trabalhar com banco de dados

Utilizar um drive do próprio banco de dados (de acordo com o db que quero usar)
Trabalhar com um ORM o TypeORM, um ORM é o mapeamento de objetos, ele básicamente
vai pegar a minha classe dentro do meu projeto que eu vou chamar de entidade e ele
vai conseguir mapear essa minha classe para uma tabela expecífica do banco de dados.

## Configurar o typeORM na aplicação

Criando e Configurando o arquivo ormconfig.json
Criando conexão
Chamando a conexão para o arquivo principal (server.ts)

## Criar migration de usuário

Uma migration é como se fosse um histórico de tudo que eu estou fazendo em relação ao
bancode dados, lá eu vou criar as minhas tabelas, deletar as tabelas se for o caso, vou
alterar um campo que tem na minha tabela, toda a estrutura da tabela vai ficar dentro da
migration.

    "migrations": [
        "./src/database/migrations/**.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }

Configurando o (packege.json) com novo script ("typeorm") para pegar o cli do typeORM para
rodar as migration que forem criadas.
No arquivo (ormconfig) vou configurar ele para que toda migration que for criada ir para um
diretório que eu chamo de (migration).

### Criar estrutura para fazer o cadastro do usuário
Criando Controllers e Route da aplicação, configurando primeiro Controller e Router com o User
para testar no Insomnia

### Criar Entidade de usuário
Primeiro mapear as entidades que eu quero rodar no arquivo (ormconfig.json).
Criar uma pasta chamada (models) e vou começar criando o arquivo (User.ts) que vai ser a classe
de entidade do usuário
Configurar o arquivo (tsconfig.json) para habilitar os decorators, instalar a lib (uuid) para o
meu código ficar responsável por gerar esse id e não o banco e configurar os parametros da minha
entidade de usuário em sí.

### Salvar usuário no banco de dados
Para mim salvar vou ter que criar um repositório de usuário para mim ter alguns metódos disponiveis
dentro do typeORM,

## Criação da Rota de usuário
OK!