import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];

const tweets = [];

server.post(`/sign-up`,(req,res) => {
    const singup = req.body;
    console.log(singup)
    users.push(singup);
    res.send(`OK!`);
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
    
    res.send(iterTweets);
})

server.post(`/tweets`,(req,res) => {
    const tweet = req.body;
    tweets.push(tweet);
    res.send(`OK!`);
 
})

server.listen(5000,(req,res) => {
    console.log(`Listening on port 5000`)
})