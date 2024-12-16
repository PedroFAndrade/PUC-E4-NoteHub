import express from "express";
import {routerUser} from "./routes/users.js";
import { connectDB } from './connections/db.js'

const app = express();
app.use(express.json());
connectDB();

app.use(routerUser)

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Users-MS rodando na porta ${PORT}`);
});