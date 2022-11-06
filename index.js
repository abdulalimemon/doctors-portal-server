const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// MiddleWare
app.use(cors());
app.use(express.json());


// MongoDb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c2mwj65.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db("doctors_portal");
        const servicesCollection = database.collection("services");

        // Services API
        app.get('/services', async(req,res)=> {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



// APIs
app.get('/', (req, res) => {
    res.send('Running Server')
});


// Port Listening
app.listen(port, () => {
    console.log('Listening to port', port);
})