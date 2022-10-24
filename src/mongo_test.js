import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://huynh_tk:edengame@cluster0.wdg3ave.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// Database Name
const dbName = 'EdensAdventure';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('greyhoundPlayers');

    // the following code examples can be pasted here...
    const findResult = await collection.findOne({ name: "TES" });
    console.log('Found documents =>', findResult);

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());