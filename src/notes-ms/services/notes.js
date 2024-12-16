import { getCollection } from '../connections/db.js';
import { ObjectId } from 'mongodb';

class Notes {
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
};


export default Notes;



