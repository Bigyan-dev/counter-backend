import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://user1:testuser@countercluster.u1fyemc.mongodb.net/';
const client = new MongoClient(uri);

async function startServer() {
  await client.connect();
  const db = client.db('CounterApp');
  const users = db.collection('users');

  // Save count
  app.post('/save-count', async (req, res) => {
    const { uid, count } = req.body;
    await users.updateOne(
      { uid },
      { $set: { count } },
      { upsert: true }
    );
    res.send({ success: true });
  });

  // Get count
  app.get('/get-count/:uid', async (req, res) => {
    const uid = req.params.uid;
    const user = await users.findOne({ uid });
    res.send({ count: user?.count || 0 });
  });

  app.listen(3001, () => {
    console.log('✅ Server running on port 3001');
  });
}

startServer();
