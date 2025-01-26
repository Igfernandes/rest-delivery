# INSTALL DYNAMODB LOCALLY MANUAL

## FIRST STEP

(EN)- Install docker or docker desktop and before execute in terminal this line command: 
(pt-BR)- Depois de instalar o docker ou docker desktop, execute no seu terminal o comando:

> docker run -p 8000:8000 --name dynamo-db-local amazon/dynamodb-local:latest

## SECOND STEP
(EN)- You need download AWS CLI and configure in your PC. Link:
(pt-BR)- É preciso baixa pacote do AWS CLI e configurar na sua máquina. Link abaixo:

(https://aws.amazon.com/pt/cli/)

## THIRD STEP
(EN)- Now, add in your database configurations the credentials AWS. Run command in terminal:
(pt-BR)- Agora, Adicione as configurações necessárias de credenciais ao seu serviço da AWS CLI rodando. Execute no terminal
o comando abaixo:

> aws configure

(EN)- User the credentials down to fill in the list: 
(pt-BR)- Utilize as credenciais abaixo para preencher a lista de informações que aparece.

*AWS_ACCESS_KEY_ID:* DUMMYIDEXAMPLE
*DUMMYEXAMPLEKEY:* DUMMYEXAMPLEKEY
*REGION:* us-west-2

@Obser(EN): The last item may be empty
@Obser(pt-BR): O último item da lista pode ficar vazio.

## FOURTH STEP
(EN)- Verify if instance is enable: 
(pt-BR)- Verifique se a instância está ativa tentando listar.

> aws dynamodb list-tables --endpoint-url=http://localhost:8000
