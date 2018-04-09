var express = require('express')
var router = express.Router()
const db = require('../models/index.js')
const User = require('../models/user');




//Afficher tous les users
router.get('/', (req, res) => {
    let users = []
    let cond = {}
    db.User.findAll({
    }).then(result => {
        result.forEach(row => {
            users.push(row.dataValues) ;
        })
        res.format({
            html: () => {
                return res.render('users', {
                    title: 'Liste des utilisateurs :',
                    users: users
                })
            },
            json: () => { res.json(users); }
        })
    }).catch((error) => {
        res.send(error);
    })
})

//Login
router.get('/login', (req, res) => {
    return res.render('users/login', {
        title: 'Connexion'
    })
})
/*
router.post('/login', (req, res) => {
    Users.find({
        where:{
            name:req.body.name
        }
    }).then((result) => {
            res.send('Connexion réussie');
        }
    }).catch((error) => {
        res.send(error);
    });
});*/

// Add users

router.get('/create', (req, res) => {
    return res.render('users/create', {
       title: 'Ajouter un utilisateur :'
    })
})
router.post('/create', (req, res) => {
    db.User.sync({force:false}).then(() => {
        return db.User.create({
            email: req.body.email,
            createdAt: new Date()
        });
    }).then(() => {
        res.format({
            html: () => { res.redirect('/users') },
            json: () => { res.json({status:'success'}) }
        })
    }).catch((error) => {
        res.send(error);
    });
});
router.get('/:userId/edit', (req, res) => {
    db.User.find({
        where:{
            id:req.params.userId
        }
    }).then((result) => {
        return res.render('users/edit', {
            title: 'Modification de l\'utilisateur n°' + req.params.userId,
            user: result.dataValues
        });
    }).catch((error) => {
        res.send(error);
    });
});

    router.delete('/:userId', (req, res) => {
        Users.destroy({
            where:{
                id:req.params.userId
            }
        }).then(() => {
            res.format({
                html: () => { res.redirect('/users')  },
                json: () => { res.json({status:'success'}); }
            });
    
        }).catch((error) => {
            res.send(error);
        });
    });



module.exports = router