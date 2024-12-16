import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_HOST
const dataBase = process.env.MONGO_DATABASE

const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db(dataBase);
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
        process.exit(1);
    }
};

export const getCollection = (collectionName) => {
    if (!db) {
        throw new Error('O banco de dados não está conectado.');
    }
    return db.collection(collectionName);
};