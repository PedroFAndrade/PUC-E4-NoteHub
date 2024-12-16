# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais.

## RF-001 - Gerenciamento de Usuários

### Documentação localizada em:

* pmv-ads-2024-2-e4-proj-infra-t1-pmv-ads-2024-2-e4-proj-notehub\src\services\users.js

#### Login

##### Requisição da Api

```javascript
class Log {
    static async login(req, res) {
        try {
            const userInfo = req.body

            // Busca o usuário no banco de dados
            const user = await prisma.user.findUnique({
                where: {email: userInfo.email},
            })

            // Verifica se o usuário existe dentro do banco
            if (!user) {
                console.log(user)
                return res.status(404).json({message: 'Usuário não encontrado'})
            }

            // Compara a senha do banco com a que o usuário digitou
            const isMatch = await bcrypt.compare(userInfo.password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Senha Inválida'})
            }

            // Gerar o token JWT
            const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY, {expiresIn: '2d'})

            res.status(200).json({ token });
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Erro no Servidor'})
        }
    }
}
```

##### Lógica de Login

```javascript
  const submitLogin = async () => {
    try {
      const response = await api.post('/login', { email, password });
      sessionStorage.setItem('Token', response.data.token);
      handleLogin();
    } catch (error) {
      setErrorLogin('Falha no Login. Verifique seu e-mail e senha');
    }
  };
```

#### Cadastro

##### Requisição da Api

```javascript
class User {
    static async register(req, res) {
        try {
            const user = req.body

            console.log("secretAnswer recebido:", user.secretAnswer);
            // Verifica se o e-mail já está cadastrado
            const existingUser = await prisma.user.findUnique({
                where: {email: user.email},
            });

            console.log(existingUser)

            if (existingUser) {
                return res.status(400).json({message: 'Usuário já existe'});
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt)

            const userDB = await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: hashPassword,
                    secretAnswer: user.secretAnswer,
                },
            })
            res.status(201).json(userDB)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
```

##### Lógica de Cadastro

```javascript
  const submitSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword|| !formData.secretAnswer) {
      setErrorSignUp('Por favor, preencha todos os campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorSignUp('As senhas não coincidem');
      return;
    }
    try {
      const response = await api.post('/cadastro', {
        email: formData.email,
        name: formData.name,
        password: formData.password
      });
        handleSignUp();
      return console.log(response);
    } catch (error) {
      setErrorSignUp('Não foi possível realizar o Cadastro');
    }
  };
```

#### Editar Usuário

##### Requisição da Api

```javascript
class Edit {
    static async edit(req, res) {
        const userId = req.user.userId;
        const {email, name, password} = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: {
                    email: email,
                    name: name,
                    password: hashPassword,
                },
            });

            res.status(200).json(updatedUser);
        } catch (err) {
            if (err.code === 'P2025') { // Erro Prisma para registro não encontrado
                res.status(404).json({message: 'Usuário não encontrado'});
            } else {
                res.status(500).json({message: 'Erro no servidor', error: err.message});
            }
        }
    }
}
```

##### Lógica de Editar

```javascript
  const submitEdit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorEdit('Por favor, preencha todos os campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorEdit('As senhas não coincidem');
      return;
    }
    try {
      const token = sessionStorage.getItem('Token');
      const response = await api.put('/usuario', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      }, {
        headers: { 'Authorization': token }
      });
      alert("Edição realizada com sucesso!");
      handleEdit();
      console.log(response);
    } catch (error) {
      setErrorEdit('Não foi possível realizar a edição');
    }
  };
```

#### Excluir Usuário

##### Requisição da Api

```javascript
class Exclude {
    static async delete(req, res) {
        const userId = req.user.userId;
        try {
            const user = await prisma.user.delete({
                where: {id: userId},
            });

            if (!user) {
                return res.status(404).json({message: 'Usuário não encontrado'});
            }

            res.status(200).json({message: 'Usuário deletado com sucesso!'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
```

##### Lógica de Excluir

```javascript
    const submitDelete = async () => {
        try {
          const token = sessionStorage.getItem('Token');
          const response = await api.delete('/usuario', {
            headers: { 'Authorization': token }
          });
          alert("Usuário excluido com sucesso!");
          handleDelete();
          console.log(response);
        } catch (error) {
          setErrorDelete('Não foi possível excluir o usuário');
        }
      };
```


## RF-002 e RF-003 - Gerenciamento de Notas/Listas

### Documentação localizada em:

* pmv-ads-2024-2-e4-proj-infra-t1-pmv-ads-2024-2-e4-proj-notehub\src\notes-ms\services\notes.js

### Requisições utilizadas para a lógica

```javascript
export const SidebarProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [titleNote, setTitleNote] = useState('');
    const [textNote, setTextNote] = useState();
    const [typeNote, setTypeNote] = useState(null);
    const [noteID, setNoteID] = useState();

    console.log(data)


    const getAll = useCallback(async () => {
        const token = sessionStorage.getItem('Token');
        try {
            const response = await api.get('/getall', {
                headers: { 'Authorization': token }
            });
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    
    const deleteNotes = () => {
        const token = sessionStorage.getItem('Token');
        api.delete(`/deleteNote/${noteID}`, {
            headers: { 'Authorization': token }
        }).then(() => {
            getAll()
        }).catch(err => {
            console.error(err);
        });
    };

    const editNotes = (Body=false, Title=false) => {
        const token = sessionStorage.getItem('Token');
        const updatedNote = {};

        if (Body) {
            updatedNote.body = textNote; 
        }
        
        if (Title) {
            updatedNote.title = textNote;
        }
        
        api.put(`/editNote/${noteID}`,updatedNote, {
            headers: { 'Authorization': token },
        }).then(() => {
            getAll()
        }).catch(err => {
            console.error(err);
        });
    };


    return (
        <NotesContext.Provider value={{ 
            data, 
            getAll, 
            deleteNotes, 
            textNote, 
            setTextNote, 
            editNotes, 
            noteID, 
            setNoteID, 
            typeNote, 
            setTypeNote,
            titleNote, 
            setTitleNote
            
            }}>
            {children}
        </NotesContext.Provider>
    );
};
```

#### Criar Notas

##### Requisição da Api

```javascript
static async createNote(req, res) {
        try {
            const collection = await getCollection('notes');

            const returnReq = req.body["data"];
            const userIdFromToken = req.user.userId;
    
            await collection.insertOne({
                userId: userIdFromToken,
                title: returnReq.title,
                type: returnReq.type,
                body: returnReq.body
            });
    
            return res.status(200).json("Nota criada com sucesso");
    
        } catch (err) {
            return res.status(500).json('Erro ao acessar o banco de dados');
        };
    }
```

##### Lógica de Criar

```javascript
const addItem = () => {
        setTextNote(prevState => [
            ...prevState,
            { name: inputValue, status: false }
        ])
        setShouldEdit(true);
    };
```

#### Editar Notas

##### Requisição da Api

```javascript
static async editNote(req, res) {

        try {
            const collection = await getCollection('notes');
            const userIdFromToken = req.user.userId;
            const noteId = new ObjectId(req.params.noteId);  
            
            const updatedNote = {
                ...(req.body.data.title && { title: req.body.data.title }),
                ...(req.body.data.body && { body: req.body.data.body })
            };
    
            // Encontrar a nota pelo ID e garantir que o usuário é o dono da nota
            const result = await collection.updateOne(
                { _id: new ObjectId(noteId), userId: userIdFromToken },
                { $set: updatedNote }
            );
    
            if (result.matchedCount === 0) {
                return res.status(404).json("Nota não encontrada ou você não tem permissão para editá-la");
            }
    
            res.status(200).json("Nota atualizada com sucesso");
    
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao acessar o banco de dados');
        }
    }  
```

##### Lógica de Editar

```javascript
const editItem = (id, newName, newStatus, isEdit) => {
        setTextNote(prevState =>
            prevState.map((item, index) =>
                index === id
                    ? { ...item, name: newName, status: newStatus, edit: isEdit } // Atualiza nome e status
                    : item // Mantém os outros itens inalterados
            )
        );
        setShouldEdit(true);
    };
```

#### Excluir Notas

##### Requisição da Api

```javascript
static async deleteNote(req, res) {
        try {
            const collection = await getCollection('notes');
            const userIdFromToken = req.user.userId;
            const noteId = new ObjectId(req.params.noteId)

            let query = { _id: noteId, userId: userIdFromToken };
            console.log(noteId)
            // Tenta converter o noteId para ObjectId, caso seja necessário
            //if (ObjectId.isValid(noteId)) {
            //    query._id.stringify() = new ObjectId(noteId);
        // }

            // Verifique se a nota existe antes de tentar deletar
            const note = await collection.findOne(query);

            if (!note) {
                res.status(404).json({ message: 'Nota não encontrada' });
                console.log(`Nota com ID ${noteId} não encontrada`);
                return;
            }

            // Deleta a nota
            const result = await collection.deleteOne(query);

            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Nota deletada com sucesso' });
            } else {
                res.status(404).json({ message: 'Erro inesperado ao deletar a nota' });
                console.log(`Erro inesperado ao deletar a nota com ID ${noteId}`);
            }
        } catch (err) {
            console.error('Erro ao deletar a nota', err);
            res.status(500).send('Erro ao deletar a nota');
        }
    }
```

##### Lógica de Excluir

```javascript
const deleteItem = (name) => {
        setTextNote(prevState => prevState.filter(item => item.name !== name));
        setShouldEdit(true);
    };
```

## RF-004 - Consultar dados

### Documentação localizada em:

* pmv-ads-2024-2-e4-proj-infra-t1-pmv-ads-2024-2-e4-proj-notehub\src\notes-ms\services\notes.js

#### Realizar Pesquisa

##### Requisição da Api

```javascript
static async getAllNotes(req, res) {
        try {
            const userIdFromToken = req.user.userId;
        
            const collection = await getCollection('notes');
        
            const cursor = collection.find({ userId: userIdFromToken })
            const documents = await cursor.toArray();
            if (documents) {
                return res.status(200).json(documents);
            } else {
                return res.status(404).json('Documentos não encontrados');
            }
        
        } catch (err) {
            return res.status(500).json('Erro ao filtrar documentos');
        }
    };
```

##### Lógica da Pesquisa

```javascript
const filteredNotes = data.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
```
