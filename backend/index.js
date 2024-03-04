require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://Shafayet:Shafayet111@cluster0.8laudjn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

async function run() {
  try {
    // await client.connect();

    const userCollection = client.db('expense').collection('users');
    const expenseCollection = client.db('expense').collection('expense');
    const categoryCollection = client.db('expense').collection('category');
    app.use('/user', userRoutes(userCollection));
    app.use('/expense', expenseRoutes(expenseCollection));
    app.use('/category', categoryRoutes(categoryCollection));

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    //await client.close()
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Expense server is running');
});

app.listen(port, () => {
  console.log(`Expense server is running at PORT: ${port}`);
});
