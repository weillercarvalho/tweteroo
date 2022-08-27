import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];

const tweets = [];

server.post(`/sign-up`,(req,res) => {
    const singup = req.body;
    const {username,avatar} = req.body;
    if (!username || !avatar) {
        return res.status(400).send({error:`Todos os campos são obrigatórios!`})
    }
    else {
        users.push(singup);
        return res.send(`OK!`);
    }
})

server.get(`/tweets`,(req,res) => {
    const updatetweets = tweets.slice(-10);
    const iterTweets = updatetweets.map(element => {
        for (let i = 0; i < users.length; i++) {
            if (element.username === users[i].username) {
                return {...element, avatar: users[i].avatar}
            }
        }
    });
    const reverseIter = iterTweets.reverse();
    res.send(reverseIter);
})

server.post(`/tweets`,(req,res) => {
    console.log(req.body)
    const username =  req.headers.user;
    const {tweet} = req.body;
    if (!username || !tweet) {
        return res.status(400).send({error:`Todos os campos são obrigatórios!`})
    }
        tweets.push({username: username,tweet})
        console.log(tweets)
        return res.status(201).send(tweets);
})

server.listen(5000,(req,res) => {
    // console.log(`Listening on port 5000`)
})

