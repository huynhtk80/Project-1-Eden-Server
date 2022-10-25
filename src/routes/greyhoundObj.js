import express, { response } from "express"
import { collection } from "../server.js";
export const router = express.Router();

export const recentGreyhounds = [
    {
        icon: 'A',
        name: 'TEST',
        loc: { x: 20, y: 5 },
        CurStamina: 100,
        maxStamina: 100,
        hunger: 0,
        thirsty: 0,
        bladder: 0,
        experience: 0,
        level: 1,
        online: false,
        lastOnline: 0
    },
    {
        icon: 'B',
        name: 'TEST B',
        loc: { x: 20, y: 5 },
        CurStamina: 100,
        maxStamina: 100,
        hunger: 0,
        thirsty: 0,
        bladder: 0,
        experience: 0,
        level: 1,
        online: false,
        lastOnline: 0
    }

]

export const checkOnline = () => {
    recentGreyhounds.forEach(element => {
        if (element.lastOnline > Date.now() - 120000) {
            element.online = false;
            console.log(element.name, " is now offline")
        }

    });

}

//Load previous greyhounds
router.get("/", async (request, response) => {
    console.log('load grey point reached')
    let name = request.query.name
    console.log(name)
    //let index = recentGreyhounds.findIndex((g) => g.name === name)
    let found = await collection.findOne({ name: `${name}` })

    if (found === null) {
        response.json('not found')
    } else {
        let index = recentGreyhounds.findIndex((g) => g.name === found.name)
        if (index === -1) {
            recentGreyhounds.push(found)
        }
        console.log(found)
        response.json(found)
    }

})

//create new greyhound
router.post("/", async (request, response) => {
    let greyhound = request.body;
    console.log(greyhound)
    let found = await collection.findOne({ name: `${greyhound.name}` })
    console.log(found)
    if (found === null) {
        await collection.insertOne(greyhound)
        let index = recentGreyhounds.findIndex((g) => g.name === greyhound.name)
        if (index === -1) {
            recentGreyhounds.push(greyhound)
        }
        response.send("uploaded")
    } else
        response.send('try again')
})

router.put("/", async (request, response) => {
    console.log('put end point reached')

    const greyhound = request.body;
    console.log(typeof greyhound)
    console.log('put greyhound:', greyhound)
    console.log(greyhound.name)
    let found = await collection.findOne({ name: `${greyhound.name}` })
    console.log('database found ', found)
    if (found === null) {
        await collection.insertOne(greyhound)
        response.send("New Greyhound Saved")
    } else {
        console.log('try saving to db to: ', found._id, 'with', greyhound)
        await collection.updateOne({ _id: found._id }, {
            "$set": {
                loc: greyhound.loc,
                CurStamina: greyhound.CurStamina,
                maxStamina: greyhound.maxStamina,
                hunger: greyhound.hunger,
                thirsty: greyhound.thirsty,
                bladder: greyhound.bladder,
                experience: greyhound.experience,
                level: greyhound.level,
                online: greyhound.online,
                lastOnline: greyhound.lastOnline
            }
        })

        response.send('Saved')
    }
})

//save update online players ... need fix from db
router.patch("/", async (request, response) => {
    console.log('patch endpoint reached')
    let update = request.body;
    console.log(update)
    let index = recentGreyhounds.findIndex((g) => g.name === update.name)
    if (index === -1) {
        let found = await collection.findOne({ name: `${update.name}` })
        recentGreyhounds.push(found)
    } else { Object.assign(recentGreyhounds[index], update) }

    const fOnline = recentGreyhounds.filter(element => element.name !== update.name && element.online === true)
    if (fOnline.length > 0) {
        console.log(fOnline)
        response.json(JSON.stringify(fOnline))
    } else { response.json('empty') }
})