# Sistema de Reserva de Assentos – FIAP

## a) Sobre o Projeto

### Nome do App

Study Room

### Descrição do Problema
Em ambientes acadêmicos como a FIAP, a organização dos assentos em salas de aula pode ser um desafio, principalmente com a dificuldade de encontrar uma sala vazia que não esteja sendo usada para lecionar os alunos. A falta de um sistema visual e interativo dificulta a escolha rápida de salas e assentos disponíveis, podendo gerar confusão e perda de tempo.

### Operação Escolhida
Escolhemos trabalhar com a operação de gestão de salas de aula, pois é um cenário comum no dia a dia dos alunos e que pode ser facilmente otimizado com tecnologia, que auxilia também na organização nos locais de estudo entre os alunos.

### Funcionalidades Implementadas
Seleção de andar e sala 
<br>

Visualização de assentos disponíveis no mapeamento da sala
<br>

Interação com assentos (ao clicar, o assento fica verde, indicando escolha)
<br>

Sistema de Autenticação completo (Cadastro e Login de usuários)
<br>

Sessão de usuário persistida (Auto-login ao reabrir o app e função de Logout)
<br>

Validação explícita e inline de formulários (mensagens de erro em vermelho abaixo dos campos)
<br>

Persistência de dados locais de reservas e configurações do app
<br>


## b) Integrantes do Grupo
Gabriel Luni Nakashima RM558096 <br>
Milena Garcia Costa RM555111<br>
Gustavo Henrique RM556712<br>
Renan Simões Gonçalves RM555584<br>
Vinícius Vilas Boas RM557843<br>

## c) Como Rodar o Projeto
### Pré-requisitos
Node.js instalado


Expo Router (npx expo install expo-router)


Expo SecureStore (npx expo install expo-secure-store)


AsyncStorage (npx expo install @react-native-async-storage/async-storage)


App Expo Go no celular ou emulador Android instalado e configurado (Android studio)


### Passo a Passo
#### Clone o repositório
git clone https://github.com/MilenaGarciaCosta/fiap-mdi-cp1-study-room-app.git

#### Acesse a pasta do projeto
cd fiap-mdi-cp1-study-room-app

#### Instale as dependências
npm install

#### Inicie o projeto com Expo
npx expo start

#### Rode o projeto
Escaneie o QR Code com o Expo Go no celular
ou
Rode em um emulador Android

## d) Demonstração
### Prints das Telas
#### Tela de Cadastro e Login de Usuários <br>

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/01de385d-08a1-429d-91b5-91d6f6155bc7" /> <br>
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/8fbe0f29-0692-4f7d-9191-1a0cfe31d527" />

#### Tela 1: Escolha de Andar e Sala<br>

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/7974f425-5db3-4976-bc1b-2604629cedda" /> <br>


#### Tela 2: Mapeamento da sala e escolha de assento<br>

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/6ee6b6b1-a039-4256-980b-85dc3e513251" />


#### Tela 3: Formulário para preenchimento das informações do aluno (com validação inline)<br>

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/edfcc519-7e1d-451c-a7c0-a080deac24e3" />


#### Link do vídeo do fluxo principal do APP
https://youtube.com/shorts/X1t45mt0E0Q

## e) Decisões Técnicas
### Estrutura do Projeto
O projeto foi desenvolvido utilizando React Native com Expo, estruturado em telas separadas (login, cadastro, andar/sala, assento e formulário). O acesso às telas principais é protegido, exigindo que o usuário esteja autenticado.

### Hooks Utilizados
useRouter → navegação entre telas (faz o router.push e router.replace)<br>
useLocalSearchParams → pega os parâmetros da rota (ex: classRoomNumber)<br>
useState → controla os estados dos inputs, feedback de erros e seleção de assentos<br>
useEffect → realiza a leitura dos dados persistidos logo na montagem das telas<br>
useContext → consome o estado global da aplicação (ex: dados do usuário logado)<br>

### Gerenciamento de Estado Global
Foi implementada a Context API (AuthContext / AppDataContext) para gerenciar o estado compartilhado entre as telas. O contexto disponibiliza o usuário logado e as funções de login/logout, além de proteger as rotas principais do app contra acessos de usuários não autenticados.

### Persistência e Segurança de Dados
Utilizamos o AsyncStorage para persistir informações funcionais do aplicativo (como o estado dos assentos e reservas), garantindo que os dados sobrevivam ao fechamento do app e sejam atualizados dinamicamente a cada edição.
Como diferencial de segurança, implementamos o Expo SecureStore para lidar com dados sensíveis de sessão e credenciais na autenticação, garantindo que as informações do usuário fiquem criptografadas e protegidas no dispositivo.

### Validação de Formulários
Todos os formulários (Login, Cadastro e Reserva) possuem validações explícitas antes da submissão. Implementamos mensagens de erro inline (em vermelho, diretamente abaixo do campo afetado, sem o uso de alert ou modais) para cenários como:

Campos obrigatórios vazios.<br>
Formatos de e-mail inválidos.<br>
Senhas menores que 6 caracteres.<br>
Divergência entre senha e confirmação de senha no cadastro.<br>
Botão de submissão bloqueado enquanto houver erros.<br>

### Navegação
A navegação foi implementada com Expo Router, guiando o usuário passo a passo com HUD de fácil entendimento. O fluxo garante que, após o login bem-sucedido, ocorra o redirecionamento automático para a tela principal, e ao realizar logout, a sessão seja limpa e o usuário retorne à tela de autenticação.

## f) Próximos Passos
Integração com back-end em nuvem (ex: Firebase ou Spring Boot) para persistência externa


Atualização em tempo real dos assentos via WebSockets


Responsividade aprimorada para tablets e melhorias contínuas de UI/UX
