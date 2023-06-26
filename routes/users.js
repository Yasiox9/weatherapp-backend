var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const Users = require('../models/users');
const { checkBody } = require("../modules/checkBody")

// Création d'un nouvel utilisateur:

router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ["name", "email", "password"]) ){
        res.json({ result:   false, error: 'Missing or empty fields' })
    return;
    }
// vérifier que l'utilisateur est déjà enregistré

Users.findOne({email : req.body.email }).then(data => {
    if( data === null) {
        const NewUsers = new Users({
            name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        })
        
        NewUsers.save().then(() => {
            res.json({ result : true });
        })
    }else{
        res.json({result: false, error: 'User already exists'})
    }
})
});

// connection
router.post('/signin', (req, res) => {
    if(!checkBody(req.body, ["email", "password"])){
        res.json({result: false, error: 'Missing or empty fields' })
        return;
    }

    Users.findOne({email : req.body.email, password : req.body.password, }).then(data =>{
        if(data){

            res.json({ result : true})
        }else{
            res.json({ result : false, error : "User not found"});
        }
    })
})



module.exports = router;