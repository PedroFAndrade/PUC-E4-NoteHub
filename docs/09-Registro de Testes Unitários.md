# Testes Unitários no Backend

## Testes Unitários

### Usuários

```node
describe('/v2/api/cadastro', () => {

    it('Deve retornar o código 201 e criar o usuario', async () => {
        const response = await request(app)
        .post('/v2/api/cadastro')
        .send(
            {
                "email": "wesley1.gomes@pucminas.com",
                "name": "Wesley",
                "password": "Senha teste",
                "secretAnswer": "Jujubinha"
            }
        );
        expect(response.status).toBe(200);
  });

  it('Deve retornar o código 201 e criar o usuario', async () => {
    const response = await request(app)
    .post('/v2/api/cadastro')
    .send(
        {
            "email": "wesley.gomes@pucminas.com",
            "name": "Wesley",
            "password": "Senha teste",
            "secretAnswer": "Jujubinha"
        }
    );
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Request failed with status code 409');
});
});

describe('/v2/api/login', () => {
    it('deve retornar o código 200 e o token do usuario logado', async () => {
        const response = await request(app)
        .post('/v2/api/login')
        .send(
            {
                "email": "teste@pucminas.com.br",
                "password": "12345"
            }
        );

        expect(response.status).toBe(200);
    });
  });


describe('/v2/api/recover', () => {
    it('deve retornar o código 200 e o token do usuario logado', async () => {
        const response = await request(app)
        .post('/v2/api/recover')
        .send(
            {
                "email": "wesley.gomes@pucminas.com",
                "secretAnswer": "teste"
            }
        );

        expect(response.status).toBe(200);
    });
  });


  describe('/v2/api/usuario', () => {
    it('deve retornar o código 200', async () => {
        const response = await request(app)
        .put('/v2/api/usuario')
        .set('Authorization', token)
        .send(
            {
                "email": "wesley.gomes@pucminas.com",
                "name": "Wesley Correa Gomes",
                "password": "Senha teste2"
            }
        );
  
        expect(response.status).toBe(200);
    });
  });


  describe('/v2/api/usuario', () => {
    it('deve retornar o código 200 e o texto que a nota foi criada', async () => {
        const response = await request(app)
        .delete('/v2/api/usuario')
        .set('Authorization', token)
  
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Usuário deletado com sucesso!');
    });
  });
```

### Resultados

![user-usuario-put](https://github.com/user-attachments/assets/3b11c5f8-40c2-4d17-aa2a-d91b9ea05b64)
![user-usuario-delete](https://github.com/user-attachments/assets/4ad93566-26bb-44cb-834d-963178b51612)
![users-recover](https://github.com/user-attachments/assets/39ed4b1e-940c-409c-8d36-32be17a569a8)
![users-login](https://github.com/user-attachments/assets/9486abcd-3212-41fe-9ada-d7442a14d762)
![users-cadastro](https://github.com/user-attachments/assets/5401e54c-a2a4-4b7f-b850-094fb987aa38)

### Notas/Listas

```node
describe('/v2/api/getall', () => {

    it('Deve retornar o código 200', async () => {
    const response = await request(app).get('/v2/api/getall').set('Authorization', token);
    expect(response.status).toBe(200);
  });
});

describe('/v2/api/createNote', () => {
    it('deve retornar o código 200 e o texto que a nota foi criada', async () => {
        const response = await request(app)
        .post('/v2/api/createNote')
        .set('Authorization', token)
        .send(
            {
                "title": "Lembrete1",
                "type": "text",
                "body": "Preciso reorganizar minha agenda para a próxima semana."
            }
        );

        expect(response.status).toBe(200);
        expect(response.body).toBe('Nota criada com sucesso');
    });
  });


  describe('/v2/api/editNote/674245e7306a87635e2e33d4', () => {
    it('deve retornar o código 200 e o texto que a nota foi criada', async () => {
        const response = await request(app)
        .put('/v2/api/editNote/674245e7306a87635e2e33d4')
        .set('Authorization', token)
        .send(
            {
                "title": "Lembrete",
                "type": "text",
                "body": "Preciso reorganizar minha agenda para a próxima semana."
            }
        );
  
        expect(response.status).toBe(200);
        expect(response.body).toBe('Nota atualizada com sucesso');
    });
  });


  describe('/v2/api/deleteNote/674245c9306a87635e2e33d3', () => {
    it('deve retornar o código 200 e o texto que a nota foi criada', async () => {
        const response = await request(app)
        .delete('/v2/api/deleteNote/674245c9306a87635e2e33d3')
        .set('Authorization', token)
  
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Nota deletada com sucesso');
    });
  });

```

### Resultados

![notes-getall](https://github.com/user-attachments/assets/462c6282-97e7-45fd-be73-dbb5febdff06)
![notes-editnotes](https://github.com/user-attachments/assets/997cf0dd-9cdc-48cb-9347-488192bfebc8)
![notes-deletenotes](https://github.com/user-attachments/assets/bf3cd8e5-9155-40d4-bf77-473bc216ac55)
![notes-createnotes](https://github.com/user-attachments/assets/b945940e-f8d7-4dd1-afad-3ae186038f77)
