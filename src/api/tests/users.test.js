import request from 'supertest';
import app from '../server';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQyNTE1MzlkNjZhMzgwZWU3YWI3NmYiLCJuYW1lIjoiV2VzbGV5IiwiZW1haWwiOiJ3ZXNsZXk1NS5nb21lc0BwdWNtaW5hcy5jb20iLCJpYXQiOjE3MzI0MDAxNzksImV4cCI6MTczMjQ4NjU3OX0.__wfJybRK26D112ELkPCBOPJ47R1nCVOD4_e_LClcYo'


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
