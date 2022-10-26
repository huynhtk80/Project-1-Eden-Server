import express, { response } from "express"
//import { collection } from "../server.js";
export const router = express.Router();



const messageArr = []
//create new greyhound
router.post("/", async (request, response) => {
    console.log('messsage get endpoint reached')
    let messages = request.body;

    for (const message of messages) {
        messageArr.push(message)
    }
    console.log(messageArr)
    response.send("uploaded")

})

//Load previous greyhounds
router.get("/", async (request, response) => {
    console.log('message get endpoint reached')
    let readerName = request.query.name;
    console.log("reader Name: ",)
    const index = messageArr.findIndex((element) => element.name == readerName)
    console.log("index: ", index)
    if (index === -1) {
        response.send('no messages')
    } else {
        let message = messageArr.splice(index, 1)
        console.log("the message: ", message[0].message)
        response.send(message[0].message)
    }



})