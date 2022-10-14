import express from 'express'
import cors from 'cors'
import { startOrder, sendItemToPreparation, removeItemFromOrder, getMenus, fetchPreparations } from './services.js';
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


app.post('/prepareOrder/:id', (req, res) => {
    console.log(`Order id: ${req.params.id}`)
    if (req.params.id === undefined) {
        res.status(400).send('`orderId` is undefined');
        return;
    }
    res.send(sendItemToPreparation(req.params.id));
})

app.delete('/order/:idOrder/item/:idItem', async (req, res) => {
    res.send(await removeItemFromOrder(req.params.idOrder,req.params.idItem));
})

// Preparations
app.get('/preparations', async (req, res) => {
    if (req.query.state === undefined) {
        res.status(400).send('`state` property is required in query');
        return;
    }
    res.send(await fetchPreparations(req.query.state));
});

app.listen(PORT);