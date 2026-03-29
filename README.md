# Sistema de Reserva de Assentos – FIAP

## a) Sobre o Projeto

### Nome do App

**Study Room**

## Descrição do Problema

Em ambientes acadêmicos como a FIAP, a organização dos assentos em salas de aula pode ser um desafio, principalmente com a dificuldade de encontrar uma sala vazia que não esteja sendo usada para lecionar os alunos. A falta de um sistema visual e interativo dificulta a escolha rápida de salas e assentos disponíveis, podendo gerar confusão e perda de tempo.

### Operação Escolhida

Escolhemos trabalhar com a operação de gestão de salas de aula, pois é um cenário comum no dia a dia dos alunos e que pode ser facilmente otimizado com tecnologia, que auxilia também na organização nos locais de estudo entre os alunos.

### Funcionalidades Implementadas

Seleção de andar e sala
Visualização de assentos disponíveis no mapeamento da sala
Interação com assentos (ao clicar, o assento fica vermelho, indicando ocupação)
Formulário para coleta da informações do aluno
Botões de escolha de andar, sala, etc. 
HUD inferior para fácil acesso entre as telas


## b) Integrantes do Grupo

Gabriel Luni Nakashima RM558096
Milena Garcia Costa RM555111
Gustavo Henrique RM556712
Renan Simões Gonçalves RM555584
Vinícius Vilas Boas RM557843

## c) Como Rodar o Projeto

### Pré-requisitos

Node.js instalado
Expo Router (npx expo install expo-router)
App Expo Go no celular ou emulador Android 

## Passo a Passo

### Clone o repositório
git clone https://github.com/MilenaGarciaCosta/fiap-mdi-cp1-study-room-app.git


### Acesse a pasta do projeto
cd fiap-mdi-cp1-study-room-app


### Instale as dependências
npm install


### Inicie o projeto com Expo
npx expo start

### Rode o projeto

Escaneie o QR Code com o Expo Go no celular
ou
Rode em um emulador Android clicando a letra "a" no terminal 

## d) Demonstração

### Prints das Telas

Tela 1: Escolha de Andar e Sala


Tela 2: Mapeamento da sala e escolha de assento


Tela 3: Formulário para preenchimento das informações do aluno


### Vídeo / GIF


## e) Decisões Técnicas
### Estrutura do Projeto

O projeto foi desenvolvido utilizando React Native com Expo, estruturado em 3 telas separadas (andar/sala, assento e formulário), com um HUD fixo na parte inferior da tela que facilita a navegação dentro do app.

### Hooks Utilizados

useRouter → navegação entre telas (faz o router.push)
useLocalSearchParams → pega os parâmetros da rota (ex: classRoomNumber)
useState → controla o estado do assento selecionado (selectedDesk)

### Navegação

A navegação foi implementada com Expo Router, pode ser utilizada tanto pelo HUD fixo na parte inferior da tela ou pelos botões que possuem em cada tela, sendo elas:

Tela de escolha de andar e sala
Mapeamento da sala com escolha de assento
Formulário do aluno para reservamento do assento

Essa abordagem melhora a experiência do usuário, guiando-o passo a passo com HUD de fácil entendimento.

## f) Próximos Passos

Integração com back-end para persistência dos dados
Sistema de autenticação de usuários
Atualização em tempo real dos assentos
Responsividade e melhorias de UI/UX
