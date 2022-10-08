import express from 'express'
import cors from 'cors'
import { startOrder, addItemToOrder, sendItemToPreparation, removeItemFromOrder, getMenus } from './services.js';
const app = express()

const PORT = parseInt(process.env.BFF_PORT) || 3005

app.use(express.json())
app.use(cors({
    origin: '*'
})) 

app.get('/menus', async (req, res) => {
    res.send(await getMenus());
})

app.post('/startOrder', async (req, res) => {
    res.send(await startOrder());
})

app.post('/addItemToOrder/:id', async (req, res) => {
    res.send(await addItemToOrder(req.params.id,req.body));
})

app.post('/sendItemToPrep/:id', (req, res) => {
    res.send(sendItemToPreparation(req.params.id))
})

app.delete('/order/:idOrder/item/:idItem', async (req, res) => {
    res.send(await removeItemFromOrder(req.params.idOrder,req.params.idItem));
})

app.listen(PORT);