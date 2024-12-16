import express from "express";
import { connectDB } from './connections/db.js'
import { routerNotes } from './routes/notes.js'

const app = express();
app.use(express.json());
connectDB();

app.use(routerNotes);

const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Notes-MS rodando na porta ${PORT}`);
});