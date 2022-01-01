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
        const learnerCollection = client.db("HeroRider").collection("learner");
        const riderCollection = client.db("HeroRider").collection("rider");
       


        

      

 
    

        // app.get('/users/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email };
        //     const user = await usersCollection.findOne(query);
        //     let isAdmin = false;
        //     if (user?.role === 'admin') {
        //         isAdmin = true;
        //     }
        //     res.json({ admin: isAdmin });
        // })

        app.post('/users', async (req, res) => {
            const user = req.body;
            if(user?.license=="null"){
              const result = await learnerCollection.insertOne(user);
            }
            else{
              const result = await riderCollection.insertOne(user);
            }
            
            console.log(result);
            res.json(result);
        });

        
        // app.put('/users/admin', verifyToken, async (req, res) => {
        //     const user = req.body;
        //     const requester = req.decodedEmail;
        //     if (requester) {
        //         const requesterAccount = await usersCollection.findOne({ email: requester });
        //         if (requesterAccount.role === 'admin') {
        //             const filter = { email: user.email };
        //             const updateDoc = { $set: { role: 'admin' } };
        //             const result = await usersCollection.updateOne(filter, updateDoc);
        //             res.json(result);
        //         }
        //     }
        //     else {
        //         res.status(403).json({ message: 'you do not have access to make admin' })
        //     }

        // })

        // app.post('/create-payment-intent', async (req, res) => {
        //     const paymentInfo = req.body;
        //     const amount = paymentInfo.price * 100;
        //     const paymentIntent = await stripe.paymentIntents.create({
        //         currency: 'usd',
        //         amount: amount,
        //         payment_method_types: ['card']
        //     });
        //     res.json({ clientSecret: paymentIntent.client_secret })
        // })

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