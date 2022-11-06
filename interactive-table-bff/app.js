import express from 'express';
import cors from 'cors';
import { getMenu, getPreparations, sendItemsToPreparation } from './behaviour.js';

const PORT = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get('/menus', async (req, res) => res.send(await getMenu()));

app.post('/order/:tableNumber/prepareOrder/:partitionNumber', async (req, res) =>
    res.send(await sendItemsToPreparation(
        req.params.tableNumber,
        req.params.partitionNumber,
        req.body
    ))
);

app.get('/preparations/:tableNumber', async (req, res) =>
    res.send(await getPreparations(req.params.tableNumber)));

app.listen(PORT);
