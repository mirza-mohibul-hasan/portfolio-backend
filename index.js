const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// Mongo start here
// const uri = "mongodb://localhost:27017";
const uri = `mongodb+srv://portfolioMaster:cJJUQDlwvgh17TWP@cluster0.clbkfrr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    ,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        client.connect((err) => {
            if (err) {
                console.log(err)
                return;
            }
        });
        /* Works here */
        const personalCollection = client.db("portfolioDB").collection("personal");
        const projectCollection = client.db("portfolioDB").collection("project");

        app.get('/personal', async (req, res)=>{
            const result = await personalCollection.find().toArray();
            res.send( result);
        });
        app.get('/project', async (req, res)=>{
            const result = await projectCollection.find().toArray();
            res.send( result);
        });

        /* Working zone end */
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
// Mongo End here

app.get('/', (req, res) => {
    res.send('Portfolio Server is running')
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})