const express = require('express')
const app = express()
const cors = require('cors');

require('dotenv').config();
const { MongoClient } = require('mongodb');


const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xldcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db('HeroRider');
        const learnerCollection = database.collection("learner");
        const riderCollection = database .collection("rider");
        app.post('/users', async (req, res) => {
            const user = req.body;
            if(user?.model=="null"){
              const result = await learnerCollection.insertOne(user);
            }
            else{
              const result = await riderCollection.insertOne(user);
            }
            
            console.log(result);
            res.json(result);
        });

        
       
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})