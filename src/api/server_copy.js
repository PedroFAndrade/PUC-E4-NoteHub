import express from "express";
import { routerNotes } from "./routes/notes.js";
import { routerUser } from "./routes/users.js"
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.use(routerNotes);
app.use(routerUser);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API Middleware rodando na porta ${PORT}`);
});
