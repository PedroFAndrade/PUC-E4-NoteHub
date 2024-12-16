| **Caso de Teste** | **CT-01 – Cadastrar Usuário** |
|:---:|:---:|
| Requisito Associado | RF-001 - A aplicação deve permitir operações básicas de CRUD para usuários, incluindo cadastro, login, e gerenciamento de contas. |
| Objetivo do Teste | Verificar se a aplicação permite o cadastro adequado de usuários. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em "Cadastrar" <br> - Informar os dados necessários para o cadastro <br> - Confirmar cadastro |
| Critério de Êxito | O cadastro do usuário deve ser efetuado com sucesso. |
| Execução de Teste - WEB | 1.	Acessando tela de cadastrar novo usuário<br> ![ct1_1](img/ct1_1.jpg)<br> 2.	Preenchendo os dados do novo usuário ![ct1_1](img/ct1_2.jpg)<br> 3.	Usuário cadastrado com sucesso ![ct1_1](img/ct1_3.jpg) <br> 4.	Usuário salvo no banco de dados e id gerado ![ct1_1](img/ct1_4.jpg)|
| Execução de Teste - MOBILE | 1.	Acessando tela de cadastrar novo usuário<br><img src="https://github.com/user-attachments/assets/f864eb88-4190-4e8c-92ef-8dd773e0f4f2" alt="WhatsApp Image 2024-11-24 at 21:20:00" width="200"/><br> 2.	Preenchendo os dados do novo usuário<br><img src="https://github.com/user-attachments/assets/3ccedd50-8a3e-4db5-911a-c30df132869a" alt="WhatsApp Image 2024-11-24 at 21:20:00" width="200"/><br> 3.	Usuário cadastrado com sucesso<br><img src="https://github.com/user-attachments/assets/05293725-d176-43a9-813c-e5a11fb24da3" alt="WhatsApp Image 2024-11-24 at 21:20:00" width="200"/>|
| | |
| **Caso de Teste** | **CT-02 – Login** |
| Requisito Associado | RF-001 - A aplicação deve permitir operações básicas de CRUD para usuários, incluindo cadastro, login, e gerenciamento de contas. |
| Objetivo do Teste | Vereficar se o email e senha estão corretos e o usuário consegue acessar o sistema. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em "Login" <br> - Informar os dados necessários para o login <br> - Clicar em "logar" |
| Critério de Êxito | Usuário logado com sucesso. |
| Execução de Teste - WEB | 1.	Login de um usuário existente<br> ![ct2](img/ct2_1.jpg)<br>2.	Realizando o login ![ct2](img/ct2_2.jpg)<br> 3.	Token de verificação gerado ![ct2](img/ct2_3.jpg) <br>|
| Execução de Teste - MOBILE | 1.	Login de um usuário existente<br><img src="https://github.com/user-attachments/assets/5273b0f1-095c-40e0-81ba-8debd20f42ab" alt="WhatsApp Image 2024-11-24 at 21:20:01" width="200"/><br> 2.	Realizando o login<br><img src="https://github.com/user-attachments/assets/e9ca86d3-8734-40e5-850f-a63c4dbd9f5a" alt="WhatsApp Image 2024-11-24 at 21:20:01" width="200"/><br>|
| | |
| **Caso de Teste** | **CT-03 – Gerenciar Usuário** |
| Requisito Associado | RF-001 - A aplicação deve permitir operações básicas de CRUD para usuários, incluindo cadastro, login, e gerenciamento de contas. |
| Objetivo do Teste | Verificar se o Usuário consegue fazer alterações em "email" "senha" "nome". |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em "Gerenciar Usuário"  <br> - Clicar em "Editar Usuário"  <br> - Fazer as alterações <br> - Confirmar alterações |
| Critério de Êxito | Alterações realizadas com sucesso. |
| Execução de Teste - WEB | 1.	Abrindo menu do usuário logado <br>![ct3 1](https://github.com/user-attachments/assets/18699a84-bd6a-4cc1-8416-d06d4e83ceb4)<br> 2.	Modal de Edição <br>![ct3 2](https://github.com/user-attachments/assets/d2156566-1759-4a07-a608-c19e80abe126)<br> 3.	Edição resalizada com sucesso <br>![ct3 3](https://github.com/user-attachments/assets/328ac292-471f-4421-82de-f64a97423c4c)<br>|
| Execução de Teste - MOBILE | 1.	Abrindo menu do usuário logado <br><img src="https://github.com/user-attachments/assets/145b9aba-8321-452d-ab74-966b2b360a35" alt="WhatsApp Image 2024-11-24 at 21:20:01 (2)" width="200"/><br> 2.	Modal de Edição <br><img src="https://github.com/user-attachments/assets/52a6c43f-46b2-4741-81b0-a239385e4439" alt="WhatsApp Image 2024-11-24 at 21:20:01 (3)" width="200"/><br> 3.	Edição resalizada com sucesso <br><img src="https://github.com/user-attachments/assets/b8345be6-70d1-4f9f-b119-0ef139d55eea" alt="WhatsApp Image 2024-11-24 at 21:20:02" width="200"/><br>|
| | |
| **Caso de Teste** | **CT-04 – Deletar Usuário** |
| Requisito Associado | RF-001 - A aplicação deve permitir operações básicas de CRUD para usuários, incluindo cadastro, login, e gerenciamento de contas. |
| Objetivo do Teste | Verificar se o Usuário consegue deletar seu usuário. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em "Gerenciar Usuário" <br> - Clicar em "Deletar Usuário" <br> - Confirmar |
| Critério de Êxito | Usuário deletado com sucesso. |
| Execução de Teste - WEB | 1.	Função de exclusão de usuário<br> ![ct4](img/ct4_1.jpg)<br>![ct4](img/ct4_1_1.jpg)<br>2.	Usuário deletado, login não pode ser realizado ![ct4](img/ct4_2.jpg) <br>|
| Execução de Teste - MOBILE| 1.	Função de exclusão de usuário<br><img src="https://github.com/user-attachments/assets/145b9aba-8321-452d-ab74-966b2b360a35" alt="WhatsApp Image 2024-11-24 at 21:20:01 (2)" width="200"><br> 2.	Usuário deletado <br><img src="https://github.com/user-attachments/assets/40c447df-b3c9-45c1-8c51-db3bcf8c771b" alt="WhatsApp Image 2024-11-24 at 21:20:03 (2)" width="200"/><br>|
| | |
| **Caso de Teste** | **CT-05 – Criar notas** |
| Requisito Associado | RF-002 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para notas. |
| Objetivo do Teste | Verificar se a aplicação permite a criação de notas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em "+" <br> - Clicar em "Nova nota" |
| Critério de Êxito | A criação da nota deve ser criada com sucesso. |
| Execução de Teste - WEB | 1.	Abrir o menu de criação de notas<br> ![ct5 1](https://github.com/user-attachments/assets/71b7b1fa-faa8-431f-a731-9458911752dc)<br> 2. Nota criada<br>![ct5 2](https://github.com/user-attachments/assets/5f92bc40-fa59-4c0d-a083-1459b20af1a3)<br>|
| Execução de Teste - MOBILE | 1.	Abrir o menu de criação de notas <br><img src="https://github.com/user-attachments/assets/e3187f23-b623-4646-a30d-8c0eed33d67a" alt="WhatsApp Image 2024-11-24 at 21:20:02 (1)" width="200"/><br> 2. Nota criada <br><img src="https://github.com/user-attachments/assets/b55f9ceb-70fd-4933-9620-45665c8adee6" alt="WhatsApp Image 2024-11-24 at 21:20:02 (2)" width="200"/><br>|
| | |
| **Caso de Teste** | **CT-06 – Acessar a notas** |
| Requisito Associado | RF-002 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para notas. |
| Objetivo do Teste | Verificar se a aplicação permite acesso a nota criada e visualizar. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em uma nota <br> - Visualizar conteúdo |
| Critério de Êxito | O Usuário consegue ler o conteúdo da nota. |
| Execução de Teste - WEB | 1.	Exibição da nota cadastrada<br> ![ctn2](img/ctn2_1.jpg)<br>2.	Nota cadastrada sendo exibida ![ctn2](img/ctn2_2.jpg)<br>|
| Execução de Teste - MOBILE | 1.	Exibição da nota cadastrada <br><img src="https://github.com/user-attachments/assets/b55f9ceb-70fd-4933-9620-45665c8adee6" alt="WhatsApp Image 2024-11-24 at 21:20:02 (2)" width="200"/><br> 2. Nota cadastrada sendo exibida <br><img src="https://github.com/user-attachments/assets/6cc38f5f-8eb8-4534-85e8-93c400af56a4" alt="WhatsApp Image 2024-11-24 at 21:20:02 (3)" width="200"/><br>|
| | |
| **Caso de Teste** | **CT-07 – Atualizar notas** |
| Requisito Associado | RF-002 -A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para notas. |
| Objetivo do Teste | Verificar se o usuário consegue atualizar as notas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar no nome da nota desejável <br> - Fazer atualizações <br> - Confirmar |
| Critério de Êxito | Usuário consegue observar que a nota foi atualizada. |
| Execução de Teste - WEB | 1.	Nota atualizada <br> ![ctn3](img/ctn3_1.jpg)<br> |
| Execução de Teste - MOBILE| 1.	Nota editada <br><img src="https://github.com/user-attachments/assets/172cca99-a5a0-4f13-8115-f0c55206b931" alt="WhatsApp Image 2024-11-24 at 21:20:02 (4)" width="200"/><br> 2.	Nota atualizada <br><img src="https://github.com/user-attachments/assets/e00f97c5-af10-4cf8-8de9-4bb275b90bf8" alt="WhatsApp Image 2024-11-24 at 21:20:03" width="200"/><br> |
| | |
| **Caso de Teste** | **CT-08 – Excluir notas** |
| Requisito Associado | RF-002 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para notas. |
| Objetivo do Teste | Verificar se o Usuário consegue excluir notas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar na nota desejável <br> - Clicar em "🗑️" <br> - Confirmar |
| Critério de Êxito | O Usuário visualizar que a nota foi deletada com sucesso. |
| Execução de Teste - WEB | 1.	Nota excluída e não consta no banco de dados <br> ![ctn4](img/ctn4_1.jpg)<br> |
| Execução de Teste - MOBILE | 1.	Nota excluída <br><img src="https://github.com/user-attachments/assets/dac5e684-9858-4187-85e0-29f1165eb7a8" alt="WhatsApp Image 2024-11-24 at 21:20:03 (1)" width="200"/><br> |
| | |
| **Caso de Teste** | **CT-09 – Criar listas** |
| Requisito Associado | RF-003 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para listas de verificação. |
| Objetivo do Teste | Verificar se a aplicação permite a criação de listas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em "+" <br> - Clicar em "Nova lista" |
| Critério de Êxito | A criação da lista deve ser criada com sucesso. |
| Execução de Teste | 1.	Abrir o menu de criação de notas<br>![ct9 1](https://github.com/user-attachments/assets/67d49267-3e79-4580-aa5a-72c903f77bb9)<br> 2. Lista criada<br>![ct9 2](https://github.com/user-attachments/assets/4245a679-dfbc-4b31-b1a9-d2e3ab31eecb)<br>|
| | |
| **Caso de Teste** | **CT-10 – Acessar a Listas** |
| Requisito Associado | RF-003 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para listas de verificação. |
| Objetivo do Teste | Verificar se a aplicação permite acesso a lista criada e visualizar. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar em uma lista <br> - Visualizar conteúdo |
| Critério de Êxito | O Usuário consegue ler o conteúdo da lista. |
| Execução de Teste | 1.	Exibição da lista cadastrada <br> ![ctl2](img/ctl2_1.jpg)<br> |
| | |
| **Caso de Teste** | **CT-11 – Atualizar Listas** |
| Requisito Associado | RF-003 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para listas de verificação. |
| Objetivo do Teste | Verificar se o usuário consegue atualizar as listas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar no nome da lista desejável <br> - Fazer atualizações <br> - Confirmar |
| Critério de Êxito | Usuário consegue observar que a lista foi atualizada. |
| Execução de Teste | 1.	Lista atualizada <br> ![ctl3](img/ctl3_1.jpg)<br> |
| | |
| **Caso de Teste** | **CT-12 – Excluir Listas** |
| Requisito Associado | RF-003 - A aplicação deve permitir operações básicas de CRUD (criação, leitura, atualização e exclusão) para listas de verificação. |
| Objetivo do Teste | Verificar se o Usuário consegue excluir listas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar na lista desejável <br> - Clicar em "🗑️" <br> - Confirmar |
| Critério de Êxito | O Usuário visualizar que a lista foi deletada com sucesso. |
| Execução de Teste | 1.	Exclusão da lista <br> ![ctl4](img/ctl4_1.jpg)<br> ![ctl4](img/ctl4_1_1.jpg)<br>|
| | |
| **Caso de Teste** | **CT-13 – Busca de notas e listas** |
| Requisito Associado | RF-004 - A aplicação deve possuir um sistema de busca para localização das notas/listas |
| Objetivo do Teste | Verificar se o Usuário consegue buscar notas e listas. |
| Instruções | - Acessar a aplicação Web ou Mobile <br> - Clicar na barra de pesquisar <br> - digitar nome da nota ou lista <br> - Clicar no nome da nota ou lista |
| Critério de Êxito | O Usuário visualizar que a nota ou a lista foi localizada. |
| Execução de Teste - WEB | 1.	Visualizar lista <br>![ct13 1](https://github.com/user-attachments/assets/f6b425ca-1074-476f-b8de-f7575df423f4)<br> 2.	Lista filtrada <br>![ct13 2](https://github.com/user-attachments/assets/ef855c6a-444b-4a10-b428-b5950027d9ef)<br>|
| Execução de Teste - MOBILE| 1.	Visualizar lista <br><img src="https://github.com/user-attachments/assets/c2c4e634-9208-4125-9d5d-cf76d4aa463e" alt="ct13 m1" width="200"/><br> 2.	Lista filtrada <br><img src="https://github.com/user-attachments/assets/0bfaa2b6-0ea6-468b-8918-ce8068723342" alt="ct13 m2" width="200"/><br>|
| | |
