const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/firebaseConfig');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/api/queues', async (req, res) => {
    const snapshot = await db.collection('queues').get();
    const queues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(queues);
});


app.post('/api/queues', async (req, res) => {
    const { name, service } = req.body;
    const newQueue = { name, service, status: 'waiting', createdAt: new Date() };
    const docRef = await db.collection('queues').add(newQueue);
    res.json({ id: docRef.id, ...newQueue });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
