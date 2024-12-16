import request from 'supertest';
import app from '../server';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzIzZjAwNmVlNjVkNTQ4MTZkMTk3OTciLCJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQHB1Y21pbmFzLmNvbS5iciIsImlhdCI6MTczMjM5NDczMiwiZXhwIjoxNzMyNDgxMTMyfQ.t8NEFO7IeXZ-qdAZvWKXArOilL-OpTkezlP2HXHi_FI'


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
