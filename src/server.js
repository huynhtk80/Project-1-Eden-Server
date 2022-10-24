import express from "express"
import { checkOnline, router as edenRouter } from './routes/greyhoundObj.js'
import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://huynh_tk:edengame@cluster0.wdg3ave.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// Database Name
const dbName = 'EdensAdventure';

// Use connect method to connect to the server
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
export const collection = db.collection('greyhoundPlayers');

// const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);

// const findResult = await collection.find({ name: 'TEST' }).toArray();
// console.log('Found documents =>', findResult);


const app = express();
//const PORT = 4002;
const PORT = 8080;
app.use(express.json());

app.use('/greyhound', edenRouter)


app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`)
})




setInterval(checkOnline, 120000)

