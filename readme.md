# Mapeamento da aplicação


**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio



## Cars

### Cadastro de Carros

**RF**
    - Deve ser possível cadastrar um novo carro.

**RN**
    - Para cadastrar um novo carro o usuário DEVE ser Admin.
    - Não deve ser possível cadastrar dois carros com a mesma placa.
    - Por padrão o carro deve ser registrado com a disponilidade 'true'.

### Listagem de Carros

**RF**
    - Deve ser possível listar todos os carros disponiveis.
    - Deve ser possível listar todos os carros disponiveis pelo nome da categoria.
    - Deve ser possível listar todos os carros disponiveis pelo nome da marca.
    - Deve ser possível listar todos os carros disponiveis pelo nome do carro.

**RN**
    - Não precisa ser um usuário cadastrado para ver a lista de veículos disponiveis.


## Specifications Cars

### Cadastrar Especificação no Carro

**RF**
    - Deve ser possível cadatrar uma especificação no carro
    - Deve ser possível listar todas as especificações
    - Deve ser possível listar todos os carros

**RN**
    - Para cadastrar uma especificação no carro o usuário DEVE ser Admin.
    - Não deve ser possível cadastrar uma especificação para um carro que não foi registrado no sistema.
    - Não deve ser possível cadastrar uma especificação já existente no carro.


### Cadastrar Imagens do Carro
**RF** 
    - Deve ser possível cadastrar imagens de um carro.
    - Deve ser possível listar todos os carros.

**RNF**
    - Utilizar multer para upload dos arquivos.

**RN**
    - Para cadastrar uma imagem no carro o usuário DEVE ser Admin.
    - O usuário deve poder cadastrar uma ou mais imagens para o mesmo carro.

### Agendamento de Aluguel de um Carro
**RF**
    - Deve ser possível cadastrar um aluguel.

**RN**
    - O aluguel deve ter duração mínima de 24 horas.
    - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.    
    - O aluguel só pode ser realizado em um carro existente no sistema










# ANOTAÇÕES GERAIS

# Aluguel de Carros

A estrutura de tabelas dessa aplicação pode ser visualizada no arquivo 'diagrama-tabela.png',

## Nesta aplicação será possível 

### Cadastrar:
- Veículos
- Categorias de Veículos
- Especificações Veículos
- Imagens de Veículos (1 | +) 
- Usuários
- Aluguéis

### Visualizar:

descrição de tabelas
### Veículos
### Categorias
### Imagens
### Usuários
### Aluguéis
### Especificações


## Estrutura de arquivos 

### Routes:
    Arquivo que irá separar as rotas da aplicação, ou seja, para cada dominio/recurso disponível no projeto criaremos uma rota

## Models:
    Local onde será definido o modelo de informações utilizadas/inseridas em cada objeto das rotas

    Este modelo é definido por classes.


## Repositories:

### Informações Adicionais:

 --> class: estrutura que descreve estados e comportamentos de um objeto.

 --> constructor: É um método especial para criar e inicializar um objeto criado a partir de uma class.

 --> this: Toda função JavaScript, ao ser executada, gera uma associação do objeto criado pelo interpretador através da palavra reservada 'this'. O valor do this é constante e ele existe enquanto este contexto de execução existir. No browser, o this “padrão” referencia o objeto global window.

