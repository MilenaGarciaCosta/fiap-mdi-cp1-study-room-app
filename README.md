# Sistema de Reserva de Assentos – FIAP

## a) Sobre o Projeto

### Nome do App

## **Study Room**

## Descrição do Problema

Em ambientes acadêmicos como a FIAP, a organização dos assentos em salas de aula pode ser um desafio, principalmente com a dificuldade de encontrar uma sala vazia que não esteja sendo usada para lecionar os alunos. A falta de um sistema visual e interativo dificulta a escolha rápida de salas e assentos disponíveis, podendo gerar confusão e perda de tempo.

### Operação Escolhida

Escolhemos trabalhar com a operação de gestão de salas de aula, pois é um cenário comum no dia a dia dos alunos e que pode ser facilmente otimizado com tecnologia, que auxilia também na organização nos locais de estudo entre os alunos.

### Funcionalidades Implementadas

**Seleção de andar e sala**<br>
**Visualização de assentos disponíveis no mapeamento da sala**<br>
**Interação com assentos (ao clicar, o assento fica verde, indicando escolha)**<br>
**Formulário para coleta da informações do aluno para reserva do assento**<br>

## b) Integrantes do Grupo

Gabriel Luni Nakashima RM558096 <br>
Milena Garcia Costa RM555111 <br>
Gustavo Henrique RM556712 <br>
Renan Simões Gonçalves RM555584 <br>
Vinícius Vilas Boas RM557843 

## c) Como Rodar o Projeto

### Pré-requisitos

Node.js instalado <br>
Expo Router (npx expo install expo-router) <br>
App Expo Go no celular ou emulador Android instalado e configurado (Android studio) <br>

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
Rode em um emulador Android 

## d) Demonstração

### Prints das Telas

Tela 1: Escolha de Andar e Sala <br>

<img width="250" height="600" alt="image" src="https://github.com/user-attachments/assets/62561f21-2a73-40f5-b0ef-7f751f9923b7" />
<br>



Tela 2: Mapeamento da sala e escolha de assento <br>
<img width="250" height="600" alt="image" src="https://github.com/user-attachments/assets/7051c326-0a58-40d9-9a31-07623d610044" />
<br>



Tela 3: Formulário para preenchimento das informações do aluno <br>
<img width="250" height="600" alt="image" src="https://github.com/user-attachments/assets/5a04b687-bcfb-46f2-9580-c1170f0cabc6" />
<br>


### Link do vídeo do fluxo principal do APP

https://youtube.com/shorts/TBPGJQblL-c?feature=share

## e) Decisões Técnicas
### Estrutura do Projeto

O projeto foi desenvolvido utilizando React Native com Expo, estruturado em 3 telas separadas (andar/sala, assento e formulário), com um HUD fixo na parte inferior da tela que facilita a navegação dentro do app.

### Hooks Utilizados

useRouter → navegação entre telas (faz o router.push) <br>
useLocalSearchParams → pega os parâmetros da rota (ex: classRoomNumber) <br>
useState → controla o estado do assento selecionado (selectedDesk)

### Navegação

A navegação foi implementada com Expo Router, pode ser utilizada tanto pelo HUD fixo na parte inferior da tela ou pelos botões que possuem em cada tela, sendo elas:

Tela de escolha de andar e sala <br>
Mapeamento da sala com escolha de assento <br>
Formulário do aluno para reservamento do assento

Essa abordagem melhora a experiência do usuário, guiando-o passo a passo com HUD de fácil entendimento.

## f) Próximos Passos

Integração com back-end para persistência dos dados <br>
Sistema de autenticação de usuários <br>
Atualização em tempo real dos assentos <br>
Responsividade e melhorias de UI/UX
