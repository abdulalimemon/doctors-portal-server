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
        const bookingCollection = database.collection("bookings");

        // Services API
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const query = {treatment:booking.treatmentName, date:booking.date, patient: booking.patientEmail}
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        });


















        /**
         * API Naming Convention
         * app.get('/booking') // get all bookings in this collection. or get more than one or by filter
         * app.get('/booking/:id') // get a specific booking 
         * app.post('/booking') // add a new booking
         * app.patch('/booking/:id) // update
         * app.delete('/booking/:id) // delete
        */

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